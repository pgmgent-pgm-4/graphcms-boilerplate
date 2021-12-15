import { Router } from 'express';

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

// Returns the API router
export default apiRouter;