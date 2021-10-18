import { Response, Request } from 'express';

import { UserType } from '../models/user';

import { prepareUserDTO } from '../utils/user';

// eslint-disable-next-line
export const getCurrentUser = (req: Request, res: Response): Response => {
  return res.send(prepareUserDTO(req.user as UserType));
};
