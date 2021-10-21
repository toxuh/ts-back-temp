import * as express from 'express';

import * as controller from '../controllers/visit';

const userRouter = express.Router();

userRouter.post('', controller.createVisit);
userRouter.get('/:id', controller.getVisitById);

export default userRouter;
