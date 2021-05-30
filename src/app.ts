import * as express from 'express';
import { connect, Error } from 'mongoose';
import { json } from 'body-parser';

import settings from './config';

import taskRouter from './api/tasks';
import userRouter from './api/users';

const app = express();

app.use(json());

app.use('/tasks', taskRouter);
app.use('/user', userRouter);

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
