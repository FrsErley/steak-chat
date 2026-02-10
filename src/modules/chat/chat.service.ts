import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schemas/message.schema';
import { Model } from 'mongoose';
import { SendMessageDto } from './dto/send-message-dto';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  async sendMessages(dto: SendMessageDto) {
    const message = await this.messageModel.create(dto);

    await this.redis.lpush(
      `conversation:${dto.conversationId}:messages`,
      JSON.stringify(message),
    );
    await this.redis.expire(`conversation:${dto.conversationId}:messages`, 300);

    return message;
  }

  async getMessages(conversationId: string) {
    return this.messageModel.find({ conversationId }).sort({ createdAt: 1 });
  }
}
