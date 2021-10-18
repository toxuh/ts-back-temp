import * as express from 'express';

import * as controller from '../controllers/patient';

const userRouter = express.Router();

userRouter.get('', controller.getPatientsList);
userRouter.post('', controller.createPatient);

export default userRouter;
