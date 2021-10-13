import { Response, Request, NextFunction } from 'express';
import { body, check } from 'express-validator';
import passport from 'passport';

import User from '../models/user';

import initializeLocalPassport from './passport-local';
import initializeJWTPassport from './passport-jwt';
import { generateToken } from '../utils/tokens';

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

          return res.json({ token });
        });
      } catch (error) {
        return next(error);
      }
      // if (err) {
      //   return res.status(400).json({ error: 'Something went wrong' });
      // }
      //
      // if (!user) {
      //   return res.status(400).json({ error: 'No user with this credentials' });
      // }
      //
      // req.login(user, { session: false }, async (error) => {
      //   if (error) {
      //     res.send(error);
      //   }
      //
      //   const token = generateToken(user);
      //
      //   res.status(200).json({ token });
      // });
    },
  )(req, res, next);
};
