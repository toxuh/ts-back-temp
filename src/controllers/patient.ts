import * as fs from 'fs';
import * as path from 'path';
import { Request, Response } from 'express';
import { v4 } from 'uuid';

import Patient, { PatientType } from '../models/patient';
import { UserType } from '../models/user';
import { isAdvancedRole } from '../utils/user';

export const getPatientsList = async (
  req: Request,
  res: Response,
): Promise<PatientType[] | Response> => {
  if (isAdvancedRole(req.user as UserType)) {
    const patients = await Patient.find();

    return res.send(patients);
  }

  return res.send({ message: 'Not enough rights' });
};

export const createPatient = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  if (isAdvancedRole(req.user as UserType)) {
    try {
      const { photo, ...rest } = req.body;

      const photoPath = path.join(
        __dirname,
        '../../public/photo',
        `${v4()}.jpg`,
      );

      const photoRaw = photo.replace(/^data:image\/jpeg;base64,/, '');

      const newPatient = new Patient({
        ...rest,
        photo: photoPath,
      });

      await newPatient.save();

      const bufferData = Buffer.from(photoRaw, 'base64');

      fs.writeFile(photoPath, bufferData, 'base64', (err) => {
        console.log(err);
      });

      return res.send({ message: 'success' });
    } catch (e) {
      return res.send({ message: 'error', details: e });
    }
  }

  return res.send({ message: 'Not enough rights' });
};

export const deletePatient = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  if (isAdvancedRole(req.user as UserType)) {
    try {
      await Patient.findByIdAndDelete(req.body.id);

      return res.send({ message: 'success' });
    } catch (e) {
      return res.send({ message: 'error', details: e });
    }
  }

  return res.send({ message: 'Not enough rights' });
};
