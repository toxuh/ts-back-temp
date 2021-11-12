import { Document, model, Schema } from 'mongoose';
import { v4 } from 'uuid';

import { Medicine } from '../enums';

export type MedicType = Document & {
  _id: string;
  role: 'MEDIC';
  createdAt: Date;
  updatedAt: Date;
  personal: {
    name: {
      firstName: string;
      middleName: string;
      lastName: string;
      additional: string;
      birthday: Date;
    };
    contacts: {
      email: string;
      phone: string;
    };
    document: {
      number: string;
      code: string;
      date: Date;
    };
    address: {
      city: string;
      zip: string;
      address: string;
      address2: string;
    };
    photo: File;
  };
  work: {
    contract: {
      id: string;
      startedAt: Date;
      updatedAt: Date;
      endedAt: Date;
    };
    workplace: {
      hospital: string;
      position: string;
      speciality: typeof Medicine;
    };
  };
};

const medicSchema = new Schema<MedicType>(
  {
    _id: { type: String, default: v4 },
    role: { type: String, default: 'REGISTERER' },
    personal: {
      name: {
        firstName: { type: String, required: true },
        middleName: { type: String, required: true },
        lastName: { type: String, required: true },
        additional: { type: String },
        birthday: { type: Date, required: true },
      },
      contacts: {
        email: { type: String, required: true },
        phone: { type: String, required: true },
      },
      document: {
        number: { type: String, required: true },
        code: { type: String, required: true },
        date: { type: Date, required: true },
      },
      address: {
        city: { type: String, required: true },
        zip: { type: String, required: true },
        address: { type: String, required: true },
        address2: { type: String },
      },
      photo: { type: String, required: true },
    },
    work: {
      contract: {
        id: { type: String, required: true },
        startedAt: { type: Date, required: true },
        updatedAt: { type: Date, required: true },
        endedAt: { type: Date },
      },
      workplace: {
        hospital: { type: String, required: true },
        position: { type: String, required: true },
        speciality: { type: String, required: true },
      },
    },
  },
  { timestamps: true },
);

export default model<MedicType>('Medic', medicSchema);
