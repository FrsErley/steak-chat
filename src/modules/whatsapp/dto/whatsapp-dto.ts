export class WhatsappBodyDto {
  From: string;
  sender: 'client' | 'bot';
  Body: string;
  channel?: 'websocket' | 'whatsapp';
}
