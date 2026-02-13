import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';

@Module({
  imports: [],
  providers: [AiService],
  exports: [AiService],
  controllers: [AiController],
})
export class AiModule {}
