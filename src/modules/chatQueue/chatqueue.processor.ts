/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { ChatService } from '../chat/chat.service';
import { ChatGateway } from '../chat/chat.gateway';
import { BotService } from '../bot/bot.service';
import { SendMessageDto } from '../chat/dto/send-message-dto';
import { WhatsappService } from '../whatsapp/whatsapp.service';

@Processor('chat')
export class ChatQueueProcessor {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatGateway: ChatGateway,
    private readonly botService: BotService,
    private readonly whatsappService: WhatsappService,
  ) {}

  @Process('process_message')
  async handleMessage(job: Job) {
    const message = job.data as SendMessageDto;

    await this.chatService.sendMessages(message);

    const intent = await this.botService.interpret(
      message.conversationId,
      message.content,
    );
    // 2 => Criar resposta do bot
    let botReply;
    if (intent.type === 'resposta_automatica') {
      botReply = intent.reply;
    } else if (intent.type === 'transferir_humano') {
      botReply = 'Encaminhando para atendente humano...';
    }

    // 3 => Salvar mensagem do bot
    const savedBotMessage = await this.chatService.sendMessages({
      conversationId: message.conversationId,
      sender: 'bot',
      content: botReply,
      channel: 'whatsapp',
    });

    this.chatGateway.server.emit('new_message', savedBotMessage);

    if (message.channel === 'whatsapp') {
      await this.whatsappService.sendMessage(message.conversationId, botReply);
    }
  }
}
