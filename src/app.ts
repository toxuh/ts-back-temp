import express from 'express';
import passport from 'passport';
import flash from 'express-flash';
import { connect, Error } from 'mongoose';
import { json, urlencoded } from 'body-parser';

import settings from './config';

import authRouter from './api/auth';
import patientRouter from './api/patient';
import userRouter from './api/user';

import URL from './utils/url';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(passport.initialize());

app.use(URL('auth'), authRouter);
app.use(
  URL('user'),
  passport.authenticate('jwt', { session: false }),
  userRouter,
);
app.use(
  URL('patients'),
  passport.authenticate('jwt', { session: false }),
  patientRouter,
);
app.use(flash());

connect(
  settings.dbSettings,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err: Error) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('DB connected');
    }
  },
);

app.listen(settings.appSettings.port, () => {
  console.log(
    `App is running on ${settings.appSettings.host}:%d`,
    settings.appSettings.port,
  );
});
