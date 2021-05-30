import * as express from 'express';

import * as controller from '../controllers/user';

const userRouter = express.Router();

userRouter.post('/register', controller.registerUser);
userRouter.post('/login', controller.loginUser);

export default userRouter;
