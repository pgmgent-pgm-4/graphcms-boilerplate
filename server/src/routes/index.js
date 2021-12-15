import { Router } from 'express';
import apiRouter from '../api/routes';

/*
Express Router

Initialize a new router
*/
const globalRouter = Router();

globalRouter.get('/', (req, res) => {
    res.status(200).send('MERN Azure running - Server');
});

/*
API Router
*/
globalRouter.use('/api', apiRouter);

// Returns the global Express router
export default globalRouter;
