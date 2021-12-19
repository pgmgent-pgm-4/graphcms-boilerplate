import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import settings from '../config/settings';

const jwtStrategy = () => {
  passport.use(new Strategy(
    {
      secretOrKey: settings.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromUrlQueryParameter("secret_token"), ExtractJwt.fromHeader("secret_token"), ExtractJwt.fromAuthHeaderAsBearerToken()]),
    },
    async (token, done) => {
      try {
        if (!token) {
          throw new Error('Token does no exists');
        }

        if (!token.user) {
          throw new Error('User is not present in the token');
        }

        done(null, token.user);
      } catch (error) {
        done(error);
      }
    },
  ));
};

export default jwtStrategy;
