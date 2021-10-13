import express from 'express';
import passport from 'passport';
import flash from 'express-flash';
import { connect, Error } from 'mongoose';
import { json, urlencoded } from 'body-parser';

import settings from './config';

import userRouter from './api/users';

import URL from './utils/url';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(passport.initialize());

app.use(URL('auth'), userRouter);
app.use(
  URL('users'),
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.json('You are here');
  },
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
