import * as express from 'express';

import * as controller from '../controllers/patient';

const userRouter = express.Router();

userRouter.get('', controller.getPatientsList);
userRouter.get('/:id', controller.getPatientById);
userRouter.post('', controller.createPatient);
userRouter.delete('', controller.deletePatient);

export default userRouter;
