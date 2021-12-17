import { Router } from 'express';

import userController from '../controllers/user.controller';

/*
Express Router

Initialize a new router
*/
const userRouter = Router();

/*
Routes
*/
userRouter.get('/', userController.index);

// Returns the API router
export default userRouter;
