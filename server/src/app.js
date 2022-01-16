import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';
import cors from 'cors';
 
import passportConfig from './config/passport';
import globalRouter from './routes';

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
  extended: false 
}));
// Parse application/json
app.use(bodyParser.json());
// Set default view engine
nunjucks.configure('views', {
  autoescape: true,
  express: app
});
app.set('view engine', 'html');
// Serve static content
app.use(express.static(path.join(process.cwd(), '..', 'client', 'build')));

/*
Passport
*/
passportConfig(app);

/*
Cors parsing middleware

cors is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
https://www.npmjs.com/package/cors
*/
const corsOptions = {
}
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
  const err = new Error(
    `${req.ip} tried to access ${req.originalUrl}`,
  );
  err.statusCode = 301;
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


// Set the port used by the server
const PORT = process.env.PORT || 8080;

// Set the Node environment
const NODE_ENV = process.env.NODE_ENV || 'development';

// Express js listen method to run project on http://localhost:3000
app.listen(PORT, () => {
  console.log(`Application is running in ${NODE_ENV} mode on port ${PORT}`);
});
