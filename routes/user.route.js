import express from 'express';
import { registrationUser, loginUser } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/registration', registrationUser);

userRouter.post('/login', loginUser);

export default userRouter;