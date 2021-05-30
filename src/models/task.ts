import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type TaskType = {
  _id: string;
  name: string;
  description?: string;
  isActive: boolean;
  isRated: boolean;
  rate: number;
};

const taskSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    isRated: { type: Boolean, default: false },
    rate: { type: Number, default: -1 },
  },
  { timestamps: true },
);

export default model('Task', taskSchema);
