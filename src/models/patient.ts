import { Document, model, Schema } from 'mongoose';
import { v4 } from 'uuid';

export type PatientType = Document & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
    additional: string;
  };
  contacts: {
    email: string;
    phone: string;
    phone2: string;
  };
  address: {
    city: string;
    zip: string;
    address: string;
    address2: string;
  };
  history: string[];
};

const patientSchema = new Schema<PatientType>(
  {
    _id: { type: String, default: v4 },
    name: {
      firstName: { type: String, required: true },
      middleName: { type: String, required: true },
      lastName: { type: String, required: true },
      additional: { type: String },
    },
    contacts: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
      phone2: { type: String },
    },
    address: {
      city: { type: String, required: true },
      zip: { type: String, required: true },
      address: { type: String, required: true },
      address2: { type: String },
    },
    history: { type: [String], default: [] },
  },
  { timestamps: true },
);

export default model<PatientType>('Patient', patientSchema);
