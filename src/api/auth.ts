import * as express from 'express';

import * as controller from '../controllers/auth';

const userRouter = express.Router();

userRouter.post('/sign-up', controller.registerUser);
userRouter.post('/sign-in', controller.loginUser);

export default userRouter;
