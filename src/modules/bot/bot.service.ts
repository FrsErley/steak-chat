import { Injectable } from '@nestjs/common';
import { ConversationService } from '../conversation/conversation.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class BotService {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly aiService: AiService,
  ) {}

  async interpret(conversationId: string, text: string) {
    const message = text.toLowerCase();

    const conversation =
      await this.conversationService.findOrCreate(conversationId);

    switch (conversation.currentStep) {
      case 'idle':
        if (this.isGreeting(message)) {
          await this.conversationService.update(conversationId, {
            currentStep: 'aguardando_nome',
          });

          return {
            type: 'resposta_automatica',
            reply: 'Olá 👋 Qual é o seu nome?',
          };
        }

        break;

      case 'aguardando_nome':
        await this.conversationService.update(conversationId, {
          currentStep: 'aguardando_interesse',
          context: { ...conversation.context, nome: text },
        });

        return {
          type: 'resposta_automatica',
          reply: `Prazer, ${text}! Você quer saber sobre:\n1️⃣ Planos\n2️⃣ Horários\n3️⃣ Falar com atendente`,
        };

      case 'aguardando_interesse':
        if (message === '1') {
          await this.conversationService.update(conversationId, {
            currentStep: 'finalizado',
            context: { ...conversation.context, interesse: 'planos' },
          });

          return {
            type: 'resposta_automatica',
            reply: '💰 Temos plano Básico R$99 e Pro R$199.',
          };
        }

        if (message === '2') {
          await this.conversationService.update(conversationId, {
            currentStep: 'finalizado',
            context: { ...conversation.context, interesse: 'horarios' },
          });

          return {
            type: 'resposta_automatica',
            reply: '🕒 Funcionamos de Seg a Sex das 08h às 18h.',
          };
        }

        if (message === '3') {
          await this.conversationService.update(conversationId, {
            currentStep: 'finalizado',
          });

          return {
            type: 'transferir_humano',
          };
        }

        return {
          type: 'resposta_automatica',
          reply: 'Digite 1, 2 ou 3.',
        };

      case 'finalizado':
        await this.conversationService.update(conversationId, {
          currentStep: 'idle',
          context: {},
        });

        return {
          type: 'resposta_automatica',
          reply:
            'Atendimento finalizado ✅\nDigite "oi" para começar novamente.',
        };
    }

    return {
      type: 'resposta_automatica',
      reply: 'Digite "oi" para começar.',
    };
  }

  private isGreeting(message: string): boolean {
    const greetings = ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite'];
    return greetings.some((greet) => message.includes(greet));
  }
}
