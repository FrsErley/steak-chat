import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Conversation extends Document {
  @Prop({ required: true, unique: true })
  conversationId: string;

  @Prop({ default: 'idle' })
  currentStep: string;

  @Prop({ type: Object, default: {} })
  context: Record<string, any>;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
