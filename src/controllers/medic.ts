import { Request, Response } from 'express';

import Medic, { MedicType } from '../models/medic';

import { UserType } from '../models/user';
import { isAdvancedRole } from '../utils/user';

export const getMedicList = async (
  req: Request,
  res: Response,
): Promise<MedicType[] | Response> => {
  if (!isAdvancedRole(req.user as UserType)) {
    return res.status(403).json({
      error: 'Forbidden',
    });
  }

  try {
    const medicList = await Medic.find();
    return res.status(200).json(medicList);
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
    });
  }
};

export const getMedicById = async (
  req: Request,
  res: Response,
): Promise<MedicType | Response> => {
  if (!isAdvancedRole(req.user as UserType)) {
    return res.status(403).json({
      error: 'Forbidden',
    });
  }

  try {
    const medic = await Medic.findById(req.params.id);
    return res.status(200).json(medic);
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
    });
  }
};

// TODO: Create
export const createMedic = async (
  req: Request,
  res: Response,
): Promise<MedicType | Response> => {
  if (!isAdvancedRole(req.user as UserType)) {
    return res.status(403).json({
      error: 'Forbidden',
    });
  }

  try {
    const medic = await Medic.create(req.body);
    return res.status(201).json(medic);
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
    });
  }
};

export const updateMedic = async (
  req: Request,
  res: Response,
): Promise<MedicType | Response> => {
  if (!isAdvancedRole(req.user as UserType)) {
    return res.status(403).json({
      error: 'Forbidden',
    });
  }

  try {
    const medic = await Medic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(medic);
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
    });
  }
};

export const deleteMedic = async (
  req: Request,
  res: Response,
): Promise<{ message: string } | Response> => {
  if (!isAdvancedRole(req.user as UserType)) {
    return res.status(403).json({
      error: 'Forbidden',
    });
  }

  try {
    await Medic.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: 'Medic deleted',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
    });
  }
};
