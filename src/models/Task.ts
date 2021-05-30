import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type TaskType = {
  _id: string;
  name: string;
  description?: string;
  isActive: boolean;
  isRated: boolean;
  rates: [];
  rate: number;
};

const TaskSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  description: { type: String },
  isActive: { type: Boolean, default: true },
  isRated: { type: Boolean, default: false },
  rates: { type: Array, default: [] },
  rate: { type: Number, default: -1 },
});

export default model('Task', TaskSchema);
