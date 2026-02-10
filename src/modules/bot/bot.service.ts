import { Injectable } from '@nestjs/common';

@Injectable()
export class BotService {
  interpret(text: string) {
    // Regras simples de teste
    const lower = text.toLowerCase();

    if (lower.includes('ajuda') || lower.includes('suporte')) {
      return { type: 'transferir_humano' };
    }

    // Resposta automática padrão
    return { type: 'resposta_automatica', reply: `Você disse: ${text}` };
  }
}
