import { Server } from 'http';
import { SendMessageDto } from './dto/send-message-dto';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatQueueService } from '../chatQueue/chatqueue.service';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatQueueService: ChatQueueService) {}

  @SubscribeMessage('send_message')
  async handleMessage(@MessageBody() data: SendMessageDto) {
    await this.chatQueueService.addMessage(data);
    return { status: 'Mensagem enviada para processamento' };
  }

  afterInit() {
    console.log('WebSocket iniciado');
  }
}
