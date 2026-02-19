import express from 'express';
import userRouter from './user.routes.js';
import todoRouter from './todo.routes.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/todo', todoRouter);
//router.use('user');

export default router;
