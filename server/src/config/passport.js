import passport from 'passport';
import jwtStrategy from '../strategies/jwt.strategy';
import localStrategy from '../strategies/local.strategy';

// Activate localStragey
localStrategy();

// Activate jwtStrategy
jwtStrategy();

const passportConfig = (app) => {
  app.use(passport.initialize());
  // app.use(passport.session());
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

export default passportConfig;
