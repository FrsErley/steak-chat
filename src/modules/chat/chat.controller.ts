import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message-dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('test')
  async testSend(@Body() dto: SendMessageDto) {
    return this.chatService.sendMessages(dto);
  }

  @Get(':conversationId')
  async getMessages(@Param('conversationId') id: string) {
    return this.chatService.getMessages(id);
  }
}
