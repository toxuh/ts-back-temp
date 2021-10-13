import { NativeError } from 'mongoose';
import { PassportStatic } from 'passport';
import passportLocal from 'passport-local';

import User, { UserType } from '../models/user';

const { Strategy: LocalStrategy } = passportLocal;

const initializeLocalPassport = (passport: PassportStatic): void => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      (email, password, done) => {
        User.findOne({ email }, (err: NativeError, user: UserType) => {
          if (err) {
            return done(err);
          }

          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }

          user.comparePassword(password, (error, isMatch) => {
            if (!isMatch) {
              return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
          });
        });
      },
    ),
  );
};

export default initializeLocalPassport;
