import { Response, Request } from 'express';
import { genSaltSync, hashSync } from 'bcrypt-nodejs';

import User, { UserType } from '../models/user';

export const registerUser = (req: Request, res: Response): void => {
  const { username, password }: UserType = req.body;
  const errors = [];

  if (!username.length) {
    errors.push({ message: 'Username required' });
  }

  if (!password.length) {
    errors.push({ message: 'Password required' });
  }

  if (errors.length) {
    res.send(errors);

    return;
  }

  const user = new User({
    username,
    password: hashSync(password, genSaltSync(8)),
  });

  user.save().then(() => {
    res.send('Successfully');
  });
};

export const loginUser = (): void => {};
