import * as express from 'express';

import * as controller from '../controllers/user';

const userRouter = express.Router();

userRouter.get('/profile', controller.getCurrentUser);

export default userRouter;
