import express from 'express';
import { login, register, logout } from './../controller/userController.js';
const userRouter = express.Router();

userRouter.route('/register').post(register);
userRouter.route('/login').post(login);
userRouter.route('/logout').get(logout);
export default userRouter;
