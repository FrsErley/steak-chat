import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty()
  conversationId: string;
  @ApiProperty()
  sender: 'client' | 'bot';
  @ApiProperty()
  content: string;
  @ApiProperty()
  channel?: 'websocket' | 'whatsapp';
}
