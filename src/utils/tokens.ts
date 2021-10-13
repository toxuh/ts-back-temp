import jwt from 'jsonwebtoken';

import settings from '../config';

import { UserType } from '../models/user';

// eslint-disable-next-line
export const generateToken = (user: UserType) => {
  return jwt.sign(
    {
      iss: settings.apiSettings.issuer,
      sub: user.id,
      iat: new Date().getTime(),
    },
    settings.apiSettings.secret,
    {
      expiresIn: 60 * 60,
    },
  );
};
