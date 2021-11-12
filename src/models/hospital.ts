import { Document, model, Schema } from 'mongoose';
import { v4 } from 'uuid';

import { Medicine } from '../enums';

export type HospitalType = Document & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  address: string;
  address2: string;
  phone: string;
  email: string;
  website: string;
  image: string;
  geo: {
    lat: number;
    lng: number;
  };
  medicines: Medicine[];
};

const hospitalSchema = new Schema<HospitalType>(
  {
    _id: { type: String, default: v4 },
    title: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    address2: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String, required: true },
    image: { type: String, required: true },
    geo: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    medicines: { type: [String], required: true },
  },
  { timestamps: true },
);

export default model<HospitalType>('Hospital', hospitalSchema);
