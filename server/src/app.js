import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import globalRouter from './routes';
import passportConfig from './config/passport';

// Read .env settings
dotenv.config();

/*
Fast, unopinionated, minimalist web framework for node.
https://www.npmjs.com/package/express

Initalize the express application
*/
const app = express();

/*
Node.js body parsing middleware

Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
https://www.npmjs.com/package/body-parser
*/

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false,
}));
// Parse application/json
app.use(bodyParser.json());

/*
Cors parsing middleware

cors is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
https://www.npmjs.com/package/cors
*/
const corsOptions = {
};
app.use(cors(corsOptions));

/*
*/
passportConfig(app);

/*
*/
app.use('/', globalRouter);

// Set the port used by the server
const PORT = process.env.PORT || 8080;

// Set the Node environment
const NODE_ENV = process.env.NODE_ENV || 'development';

// Express js listen method to run project on http://localhost:3000
app.listen(PORT, () => {
  console.log(`Application is running in ${NODE_ENV} mode on port ${PORT}`);
});
