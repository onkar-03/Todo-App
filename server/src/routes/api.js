import express from 'express';
import Login from '../controllers/Login.controller.js';
import Register from '../controllers/Register.controller.js';
import { RegisterSchema } from '../validationSchema/RegisterSchema.js';
import { LoginSchema } from '../validationSchema/LoginSchema.js';

const apiRoute = express.Router();

apiRoute.post('/register', RegisterSchema, Register);
apiRoute.post('/login', LoginSchema, Login);

export default apiRoute;
