import { Response, Request, NextFunction } from 'express';
import { body, check } from 'express-validator';
import passport from 'passport';

import Session from '../models/session';
import User, { UserType } from '../models/user';

import initializeLocalPassport from './passport-local';
import initializeJWTPassport from './passport-jwt';

import { generateToken } from '../utils/tokens';
import { prepareUserDTO } from '../utils/user';

initializeLocalPassport(passport);
initializeJWTPassport(passport);

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  await check('email', 'Email is not valid').isEmail().run(req);
  await check('password', 'Password must be at least 4 characters long')
    .isLength({ min: 4 })
    .run(req);
  await body('email').normalizeEmail({ gmail_remove_dots: false }).run(req);

  const foundUser = await User.findOne({ email: req.body.email });

  if (foundUser) {
    return res.status(403).json({ error: 'Email is already in use' });
  }

  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
  });

  await newUser.save();

  const token = generateToken(newUser);

  res.status(200).json({ token });
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  passport.authenticate(
    'local',
    { session: false },
    async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error(info.message);

          return next(error);
        }

        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);

          const token = generateToken(user);

          const newSession = new Session({
            // eslint-disable-next-line no-underscore-dangle
            user: user._id,
            email: user.email,
            role: user.role,
            ip: req.ip.split(':')[3],
          });

          await newSession.save();

          return res.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    },
  )(req, res, next);
};
