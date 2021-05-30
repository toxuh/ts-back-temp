import { Response, Request } from 'express';
import { Error } from 'mongoose';

import Task, { TaskType } from '../models/Task';

export const getAllTasks = (req: Request, res: Response): void => {
  Task.find((err: Error, tasks: TaskType[]) => {
    if (err) {
      res.send(err);
    } else {
      res.send(tasks);
    }
  });
};

export const getTaskById = (req: Request, res: Response): void => {
  Task.findById(req.params.id, (err: Error, task: TaskType) => {
    if (err) {
      res.send(err);
    } else {
      res.send(task);
    }
  });
};

export const postTask = (req: Request, res: Response): void => {
  const task = new Task(req.body);

  task.save((err: Error) => {
    if (err) {
      res.send(err);
    } else {
      res.send(task);
    }
  });
};

export const deleteTaskById = (req: Request, res: Response): void => {
  Task.deleteOne({ _id: req.params.id }, (err: Error) => {
    if (err) {
      res.send(err);
    } else {
      res.send(null);
      res.status(204).end();
    }
  });
};

export const updateTaskById = (req: Request, res: Response): void => {
  Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err: Error, task: TaskType) => {
      if (err) {
        res.send(err);
      } else {
        res.send(task);
      }
    },
  );
};
