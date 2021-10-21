import { Request, Response } from 'express';

import Visit from '../models/visit';
import { UserType } from '../models/user';
import { isAdvancedRole } from '../utils/user';

export const createVisit = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  if (isAdvancedRole(req.user as UserType)) {
    try {
      const newVisit = new Visit(req.body);

      await newVisit.save();

      return res.send({ message: 'success' });
    } catch (e) {
      return res.send({ message: 'error', details: e });
    }
  }

  return res.send({ message: 'Not enough rights' });
};

export const getVisitById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  if (isAdvancedRole(req.user as UserType)) {
    try {
      const visit = await Visit.findById(req.params.id);

      return res.send(visit);
    } catch (e) {
      return res.send({ message: 'error', details: e });
    }
  }

  return res.send({ message: 'Not enough rights' });
};
