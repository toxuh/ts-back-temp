import * as express from 'express';

import * as controller from '../controllers/task';

const taskRouter = express.Router();

taskRouter.get('', controller.getAllTasks);
taskRouter.get('/:id', controller.getTaskById);
taskRouter.post('', controller.postTask);
taskRouter.patch('/:id', controller.updateTaskById);
taskRouter.delete('/:id', controller.deleteTaskById);

export default taskRouter;
