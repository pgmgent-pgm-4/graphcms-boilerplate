import { Router } from 'express';
import passport from 'passport';

import authController from '../controllers/auth.controller';
import userRouter from './user.routes';

/*
Express Router

Initialize a new router
*/
const apiRouter = Router();

/*
Routes
*/
apiRouter.get('/', (req, res) => {
  res.status(200).send('API Home Route');
});

apiRouter.get('/login', authController.login);
apiRouter.use('/user', passport.authenticate('jwt', { session: false }), userRouter);

// Returns the API router
export default apiRouter;
