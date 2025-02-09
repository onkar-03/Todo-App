import express from 'express';
import { check } from 'express-validator';
import Login from '../controllers/Login.controller.js';
import Register from '../controllers/Register.controller.js';
import { CreateTodo } from '../controllers/todo.controller.js';
import { GetTodos } from '../controllers/TodoList.controller.js';
import { MarkTodo } from '../controllers/MarkTodo.controller.js';
import { RegisterSchema } from '../validationSchema/RegisterSchema.js';
import { LoginSchema } from '../validationSchema/LoginSchema.js';
import { RemoveTodo } from '../controllers/RemoveTodo.controller.js';

const apiRoute = express.Router();
export const apiProtected = express.Router();

apiRoute.post('/register', RegisterSchema, Register);
apiRoute.post('/login', LoginSchema, Login);

// Protected Routes
apiProtected.post(
  '/creatTodo',
  [check('desc', 'Todo Description is required').exists()],
  CreateTodo,
);

apiProtected.post(
  '/marktodo',
  [check('todo_id', 'Todo Id is required').exists()],
  RemoveTodo,
);

apiProtected.post(
  '/deleteTodo',
  [check('todo_id', 'Todo Id is required').exists()],
  MarkTodo,
);

apiProtected.get('/todolist', GetTodos);

export default apiRoute;
