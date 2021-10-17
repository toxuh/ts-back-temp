import { Document, model, Schema } from 'mongoose';
import { v4 } from 'uuid';

export type SessionType = Document & {
  user: string;
  email: string;
  role: string;
  ip: string;
};

const SessionSchema = new Schema<SessionType>(
  {
    _id: { type: String, default: v4 },
    user: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    ip: { type: String, required: true },
    navigator: { type: String, required: true },
    system: { type: String, required: true },
  },
  { timestamps: true },
);

export default model<SessionType>('Session', SessionSchema);
