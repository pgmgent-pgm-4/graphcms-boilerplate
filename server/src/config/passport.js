import passport from 'passport';

import localStrategy from '../strategies/local.strategy';

// Activate localStragey
localStrategy();

const passportConfig = (app) => {
  app.use(passport.initialize());
  // app.use(passport.session());
  // stores user to session
  // passport.serializeUser((user, done) => {
  //   done(null, user);
  // });

  // // retrieves user from session
  // passport.deserializeUser((user, done) => {
  //   done(null, user);
  // });
};

export default passportConfig;
