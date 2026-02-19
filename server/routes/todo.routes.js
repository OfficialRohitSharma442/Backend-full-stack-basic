import express from 'express';
import {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} from './../controller/todoController.js';
import { isAuthenticated } from './../middleware/isAuthenticated.js';
const todoRouter = express.Router();
todoRouter.use(isAuthenticated);
todoRouter.route('/').post(createTodo).get(getAllTodos);
todoRouter.route('/:todoId').put(updateTodo).delete(deleteTodo);

export default todoRouter;
