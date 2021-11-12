import { Request, Response } from 'express';

import Hospital, { HospitalType } from '../models/hospital';

import { UserType } from '../models/user';
import { isAdvancedRole } from '../utils/user';

export const getHospitalList = async (
  req: Request,
  res: Response,
): Promise<HospitalType[] | Response> => {
  if (!isAdvancedRole(req.user as UserType)) {
    return res.status(403).json({
      error: 'Forbidden',
    });
  }

  try {
    const hospitals = await Hospital.find();
    return res.json(hospitals);
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
    });
  }
};

export const getHospitalById = async (
  req: Request,
  res: Response,
): Promise<HospitalType | Response> => {
  if (!isAdvancedRole(req.user as UserType)) {
    return res.status(403).json({
      error: 'Forbidden',
    });
  }

  try {
    const hospital = await Hospital.findById(req.params.id);
    return res.json(hospital);
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
    });
  }
};

export const createHospital = async (
  req: Request,
  res: Response,
): Promise<HospitalType | Response> => {
  if (!isAdvancedRole(req.user as UserType)) {
    return res.status(403).json({
      error: 'Forbidden',
    });
  }

  try {
    const hospital = await Hospital.create(req.body);
    return res.json(hospital);
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
    });
  }
};

export const updateHospital = async (
  req: Request,
  res: Response,
): Promise<HospitalType | Response> => {
  if (!isAdvancedRole(req.user as UserType)) {
    return res.status(403).json({
      error: 'Forbidden',
    });
  }

  try {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json(hospital);
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
    });
  }
};

export const deleteHospital = async (
  req: Request,
  res: Response,
): Promise<{ message: string } | Response> => {
  if (!isAdvancedRole(req.user as UserType)) {
    return res.status(403).json({
      error: 'Forbidden',
    });
  }

  try {
    await Hospital.findByIdAndDelete(req.params.id);
    return res.json({
      message: 'Hospital deleted',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
    });
  }
};
