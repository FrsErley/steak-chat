import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateReply(data: { currentStep?: string; content: string }) {
    try {
      const prompt = `
      Você é atendente de uma empresa.
      Etapa atual do atendimento: ${data.currentStep ?? 'nenhuma'}
      Mensagem atual do cliente:
      "${data.content}"

      Responda de forma educada e objetiva.
      `;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
      });

      console.log(
        'Conteúdo da resposta:',
        response.choices[0]?.message?.content,
      );
      return (
        response.choices[0]?.message?.content ??
        'Desculpe, não consegui gerar uma resposta adequada.'
      );
    } catch {
      return 'No momento estamos com instabilidade...';
    }
  }
}
