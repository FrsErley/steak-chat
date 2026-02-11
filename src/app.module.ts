import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './modules/chat/chat.module';
import { BotModule } from './modules/bot/bot.module';
import { WhatsappModule } from './modules/whatsapp/whatsapp.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { AiService } from './modules/ai/ai.service';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL as string),
    RedisModule.forRoot({
      type: 'single',
      url: process.env.REDIS_URL as string,
    }),
    ChatModule,
    BotModule,
    WhatsappModule,
    ConversationModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService, AiService],
})
export class AppModule {}
