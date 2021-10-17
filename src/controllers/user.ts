import { Response, Request } from 'express';

import User, { UserType } from '../models/user';

import { isAdvancedRole, prepareUserDTO } from '../utils/user';

export const getCurrentUser = (req: Request, res: Response): Response => {
  return res.send(prepareUserDTO(req.user as UserType));
};

export const getPatientsList = async (
  req: Request,
  res: Response,
): Promise<UserType[] | Response> => {
  if (isAdvancedRole(req.user as UserType)) {
    const users = await User.find({ role: 'USER' });

    return res.send(users);
  } else {
    return res.send({ message: 'Not enough rights' });
  }
};
