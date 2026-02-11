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

  async generateReply(data: { interesse?: string; mensagem: string }) {
    const prompt = `
Você é atendente de uma empresa.
Interesse registrado: ${data.interesse ?? 'nenhum'}
Mensagem atual do cliente:
"${data.mensagem}"

Responda de forma educada e objetiva.
`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    console.log('Resposta do chat:', response);

    return (
      response.choices[0]?.message?.content ??
      'Desculpe, não consegui gerar uma resposta no momento.'
    );
  }
}
