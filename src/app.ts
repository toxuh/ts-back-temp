import express from 'express';
import passport from 'passport';
import flash from 'express-flash';
import { connect, Error } from 'mongoose';
import { json, urlencoded } from 'body-parser';

import settings from './config';

import authRouter from './api/auth';
import hospitalRouter from './api/hospital';
import medicRouter from './api/medic';
import patientRouter from './api/patient';
import registererRouter from './api/registerer';
import userRouter from './api/user';
import visitRouter from './api/visit';

import URL from './utils/url';

const app = express();

app.use(json({ limit: '50mb' }));
app.use(urlencoded({ extended: false, limit: '50mb' }));
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
app.use(
  URL('visits'),
  passport.authenticate('jwt', { session: false }),
  visitRouter,
);
app.use(
  URL('hospitals'),
  passport.authenticate('jwt', { session: false }),
  hospitalRouter,
);
app.use(
  URL('registerers'),
  passport.authenticate('jwt', { session: false }),
  registererRouter,
);
app.use(
  URL('medics'),
  passport.authenticate('jwt', { session: false }),
  medicRouter,
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
