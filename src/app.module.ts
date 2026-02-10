import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './modules/chat/chat.module';
// import { ChatQueueModule } from './modules/chatQueue/chatqueue.module';
// import { ChatQueueService } from './modules/chatQueue/chatqueue.service';
import { BotModule } from './modules/bot/bot.module';

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
    // ChatQueueModule,
    BotModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // ChatQueueService
  ],
})
export class AppModule {}
