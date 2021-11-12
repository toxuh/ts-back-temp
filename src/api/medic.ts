import * as express from 'express';

import * as controller from '../controllers/medic';

const medicRouter = express.Router();

medicRouter.get('', controller.getMedicList);
medicRouter.get('/:id', controller.getMedicById);
medicRouter.post('', controller.createMedic);
medicRouter.patch('/:id', controller.updateMedic);
medicRouter.delete('/:id', controller.deleteMedic);

export default medicRouter;
