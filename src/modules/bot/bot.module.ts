import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { ConversationModule } from '../conversation/conversation.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [ConversationModule, AiModule],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
