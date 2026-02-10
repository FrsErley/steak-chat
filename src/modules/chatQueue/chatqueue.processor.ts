/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { ChatService } from '../chat/chat.service';
import { ChatGateway } from '../chat/chat.gateway';
import { BotService } from '../bot/bot.service';
import { SendMessageDto } from '../chat/dto/send-message-dto';

@Processor('chat')
export class ChatQueueProcessor {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatGateway: ChatGateway,
    private readonly botService: BotService,
  ) {}

  @Process('process_message')
  async handleMessage(job: Job) {
    const message = job.data as SendMessageDto;
    console.log('Processando mensagem da fila:', message);

    await this.chatService.sendMessages(message);

    const intent = this.botService.interpret(message.content);

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
    });

    this.chatGateway.server.emit('new_message', savedBotMessage);
  }
}
