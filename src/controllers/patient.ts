import { Request, Response } from 'express';
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
      const newPatient = new Patient({
        ...req.body,
      });

      await newPatient.save();

      return res.send({ message: 'success' });
    } catch (e) {
      return res.send({ message: 'error', details: e });
    }
  }

  return res.send({ message: 'Not enough rights' });
};
