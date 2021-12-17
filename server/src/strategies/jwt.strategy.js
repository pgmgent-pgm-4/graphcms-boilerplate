import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import settings from '../config/settings';

const jwtStrategy = () => {
  passport.use(new Strategy(
    {
      secretOrKey: settings.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        console.log(token);
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
