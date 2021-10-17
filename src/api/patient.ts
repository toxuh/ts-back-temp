import * as express from 'express';

import * as controller from '../controllers/user';

const userRouter = express.Router();

userRouter.get('', controller.getPatientsList);

export default userRouter;
