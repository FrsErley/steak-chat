import { forwardRef, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ChatModule } from '../chat/chat.module';
import { ChatQueueProcessor } from './chatqueue.processor';
import { BotModule } from '../bot/bot.module';
import { ChatQueueService } from './chatqueue.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'chat',
      redis: { host: 'localhost', port: 6379 },
    }),
    forwardRef(() => ChatModule),
    BotModule,
  ],
  providers: [ChatQueueService, ChatQueueProcessor],
  exports: [ChatQueueService],
})
export class ChatQueueModule {}
