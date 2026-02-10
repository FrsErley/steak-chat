import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import type { Queue } from 'bull';

@Injectable()
export class ChatQueueService {
  constructor(@InjectQueue('chat') private chatQueue: Queue) {}

  async addMessage(message: any) {
    await this.chatQueue.add('process_message', message, {
      attempts: 3,
      backoff: 5000,
    });
  }
}
