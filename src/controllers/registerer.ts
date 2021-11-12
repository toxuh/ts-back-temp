import { Request, Response } from 'express';

import Registerer, { RegistererType } from '../models/registerer';

import { UserType } from '../models/user';
import { isAdvancedRole } from '../utils/user';

export const getRegistererList = async (
  req: Request,
  res: Response,
): Promise<RegistererType[] | Response> => {
  if (!isAdvancedRole(req.user as UserType)) {
    return res.status(403).json({
      error: 'Forbidden',
    });
  }

  try {
    const registererList = await Registerer.find();
    return res.json(registererList);
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
    });
  }
};

export const getRegistererById = async (
  req: Request,
  res: Response,
): Promise<RegistererType | Response> => {
  if (!isAdvancedRole(req.user as UserType)) {
    return res.status(403).json({
      error: 'Forbidden',
    });
  }

  try {
    const registerer = await Registerer.findById(req.params.id);
    return res.json(registerer);
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
    });
  }
};

export const createRegisterer = async (
  req: Request,
  res: Response,
): Promise<RegistererType | Response> => {
  if (!isAdvancedRole(req.user as UserType)) {
    return res.status(403).json({
      error: 'Forbidden',
    });
  }

  try {
    const registerer = await Registerer.create(req.body);
    return res.json(registerer);
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
    });
  }
};

// TODO: Update
export const updateRegisterer = async (
  req: Request,
  res: Response,
): Promise<RegistererType | Response> => {
  if (!isAdvancedRole(req.user as UserType)) {
    return res.status(403).json({
      error: 'Forbidden',
    });
  }

  try {
    const registerer = await Registerer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    return res.json(registerer);
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
    });
  }
};

// TODO: Delete
export const deleteRegisterer = async (
  req: Request,
  res: Response,
): Promise<{ message: string } | Response> => {
  if (!isAdvancedRole(req.user as UserType)) {
    return res.status(403).json({
      error: 'Forbidden',
    });
  }

  try {
    await Registerer.findByIdAndDelete(req.params.id);
    return res.json({
      message: 'Registerer deleted',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
    });
  }
};
