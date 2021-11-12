import * as express from 'express';

import * as controller from '../controllers/registerer';

const registererRouter = express.Router();

registererRouter.get('', controller.getRegistererList);
registererRouter.get('/:id', controller.getRegistererById);
registererRouter.post('', controller.createRegisterer);
registererRouter.patch('/:id', controller.updateRegisterer);
registererRouter.delete('/:id', controller.deleteRegisterer);

export default registererRouter;
