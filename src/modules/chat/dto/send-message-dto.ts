export class SendMessageDto {
  conversationId: string;
  sender: 'client' | 'bot';
  content: string;
}
