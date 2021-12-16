import { Router } from 'express';

import authController from '../controllers/auth.controller';

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

// Returns the API router
export default apiRouter;
