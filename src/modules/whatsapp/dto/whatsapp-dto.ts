import { ApiProperty } from '@nestjs/swagger';

export class WhatsappBodyDto {
  @ApiProperty()
  From: string;

  @ApiProperty()
  sender: 'client' | 'bot';

  @ApiProperty()
  Body: string;

  @ApiProperty()
  channel?: 'websocket' | 'whatsapp';
}
