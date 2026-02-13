import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate-reply')
  async generateReply(@Body() body: { currentStep?: string; content: string }) {
    return await this.aiService.generateReply(body);
  }
}
