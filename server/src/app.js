import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import nunjucks from 'nunjucks';

import settings from './config/settings';
import passportConfig from './config/passport';
import globalRouter from './routes';
import { HTTPError } from './utils';

/*
Fast, unopinionated, minimalist web framework for node.
https://www.npmjs.com/package/express

Initalize the express application
*/
const app = express();

/*
View Engine
*/
nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true,
});
app.set('view engine', 'html');

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
Serving static files
*/
app.use('/static', express.static(path.join(__dirname, 'public')));

/*
Passport configuration
*/
passportConfig(app);

/*
Cors parsing middleware

cors is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
https://www.npmjs.com/package/cors
*/
const corsOptions = {
};
app.use(cors(corsOptions));

/*
Add all routers to Express app

All routes (paths) are registered
*/
app.use('/', globalRouter);

/*
Not Found routes
*/
app.get('*', (req, res, next) => {
  const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  const err = new HTTPError(`${ip} tried to access ${req.originalUrl}`, 301);
  next(err);
});

/*
Error Handler
*/
app.use((err, req, res, next) => {
  const error = err;
  error.statusCode = error.statusCode || 500;
  res.status(error.statusCode);

  const body = {
    url: req.url,
    error: {
      message: error.message,
      statusCode: error.statusCode,
    },
  };

  if (req.accepts('html')) {
    res.render('error', body);
  } else if (req.accepts('json')) {
    res.json(body);
  } else {
    res.send('You have to accept application/json or text/html!');
  }
  next();
});

// Express js listen method to run project on http://localhost:3000
app.listen(settings.PORT, () => {
  console.log(`Application is running in ${settings.NODE_ENV} mode on port ${settings.PORT}`);
});
