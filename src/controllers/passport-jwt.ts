import { PassportStatic } from 'passport';
import passportJWT from 'passport-jwt';

import settings from '../config';

import User from '../models/user';

const { Strategy: JWTStrategy, ExtractJwt } = passportJWT;

const initializeJWTPassport = (passport: PassportStatic): void => {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: settings.apiSettings.secret,
      },
      (jwtPayload, done) => {
        return User.findById(jwtPayload.sub)
          .then((user) => done(null, user))
          .catch((err) => done(err));
      },
    ),
  );
};

export default initializeJWTPassport;
