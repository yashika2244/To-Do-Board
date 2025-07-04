
import express from 'express';
import {
  createTask,
  smartAssign,
  getLogs,
  getAllTasks,
  deleteTask,
  updateTask,
} from '../contorllers/taskController.js';
import protect from '../middleware/verifyToken.js';

const taskRoutes = (io) => {
  const router = express.Router();

  router.get('/', protect, getAllTasks);
  router.post('/', protect, createTask(io));
  router.put('/:id', protect, updateTask(io));
  router.delete('/:id', protect, deleteTask(io));
  router.post('/smart-assign/:id', protect, smartAssign(io));
  router.get('/logs', protect, getLogs);

  return router;
};

export default taskRoutes;
