import path from 'path';
import { Router } from 'express';
import apiRouter from '../api/routes';

/*
Express Router

Initialize a new router
*/
const globalRouter = Router();

globalRouter.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), '..', 'client', 'build', 'index.html'));
});

/*
API Router
*/
globalRouter.use('/api', apiRouter);

// Returns the global Express router
export default globalRouter;
