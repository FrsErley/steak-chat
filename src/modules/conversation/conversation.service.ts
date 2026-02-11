import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation } from './schemas/conversation.schema';
import { Model } from 'mongoose';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
  ) {}

  async findOrCreate(conversationId: string) {
    let conversation = await this.conversationModel.findOne({ conversationId });

    if (!conversation) {
      conversation = await this.conversationModel.create({
        conversationId,
        currentStep: 'idle',
        context: {},
      });
    }

    return conversation;
  }

  async update(conversationId: string, data: Partial<Conversation>) {
    return this.conversationModel.findOneAndUpdate({ conversationId }, data, {
      new: true,
    });
  }
}
