import { forwardRef, Module } from '@nestjs/common';
import { WhatsappController } from './whatsapp.controller';
import { WhatsappService } from './whatsapp.service';
import { ChatQueueModule } from 'src/modules/chatQueue/chatqueue.module';

@Module({
  imports: [forwardRef(() => ChatQueueModule)],
  controllers: [WhatsappController],
  providers: [WhatsappService],
  exports: [WhatsappService],
})
export class WhatsappModule {}
