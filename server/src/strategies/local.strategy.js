import passport from 'passport';
import { Strategy } from 'passport-local';

import { AwesomeGraphQLClient } from 'awesome-graphql-client';
import fetch from 'node-fetch';

const localStrategy = () => {
  const queryGetUserByUsername = `
    query UserQueryByUsername($username: String!) {
      user(where: { username: $username }) {
        email
      }
    }
  `;

  const client = new AwesomeGraphQLClient({
    endpoint:
      'https://api-eu-central-1.graphcms.com/v2/ckt4tbuzn1dt201z04hct50a9/master',
    fetch,
  });

  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const { user } = await client.request(queryGetUserByUsername, { username });
        if (!user) {
          throw new Error('User does no exists');
        }

        if (password !== user.password) {
          throw new Error('Incorrect Credentials');
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  ));
};

export default localStrategy;
