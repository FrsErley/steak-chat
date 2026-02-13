import { Body, Controller, Post } from '@nestjs/common';
import { ChatQueueService } from 'src/modules/chatQueue/chatqueue.service';
import { WhatsappBodyDto } from './dto/whatsapp-dto';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly chatQueueService: ChatQueueService) {}

  @Post('webhook')
  async receive(@Body() body: WhatsappBodyDto) {
    const message = {
      conversationId: body.From.replace('whatsapp:', ''),
      sender: 'client',
      content: body.Body,
      channel: 'whatsapp',
    };
    await this.chatQueueService.addMessage(message);

    return 'Ok';
  }
}
