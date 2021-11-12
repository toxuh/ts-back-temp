import * as express from 'express';

import * as controller from '../controllers/hospital';

const hospitalRouter = express.Router();

hospitalRouter.get('', controller.getHospitalList);
hospitalRouter.get('/:id', controller.getHospitalById);
hospitalRouter.post('', controller.createHospital);
hospitalRouter.patch('/:id', controller.updateHospital);
hospitalRouter.delete('/:id', controller.deleteHospital);

export default hospitalRouter;
