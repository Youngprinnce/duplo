import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ required: true, default: uuidv4 })
  _id: string;

  @Prop()
  amount: number;

  @Prop()
  date: Date;

  @Prop()
  businessId: string;

  @Prop()
  orderID: string;

  @Prop()
  customerID: string;

  @Prop({ default: TransactionStatus.PENDING, enum: Object.values(TransactionStatus) })
  status?: TransactionStatus;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
