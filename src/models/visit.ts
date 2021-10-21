import { Document, model, Schema } from 'mongoose';
import { v4 } from 'uuid';

import { Medicine } from '../enums';

export type VisitType = Document & {
  _id: string;
  startedAt: Date;
  finishedAt: Date;
  type: typeof Medicine;
  info: {
    hospital: string;
    medic: string;
  };
  syndromes?: {
    main: string;
    notes: string;
  };
  decision: {
    main: string;
    notes?: string;
  };
  drugs?: string[];
  recipe?: {
    id: string;
    active: boolean;
  };
};

const visitSchema = new Schema<VisitType>({
  _id: { type: String, default: v4 },
  startedAt: { type: Date, required: true },
  finishedAt: { type: Date, required: true },
  type: { type: String, required: true },
  info: {
    hospital: { type: String, required: true },
    medic: { type: String, required: true },
  },
  syndromes: {
    main: { type: String },
    notes: { type: String },
  },
  decision: {
    main: { type: String, required: true },
    notes: { type: String },
  },
  drugs: { type: [String] },
  recipe: {
    id: { type: String },
    active: { type: Boolean },
  },
});

export default model<VisitType>('Visit', visitSchema);
