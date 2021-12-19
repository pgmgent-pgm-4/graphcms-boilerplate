import passport from 'passport';
import { Strategy } from 'passport-local';
import { AwesomeGraphQLClient } from 'awesome-graphql-client';
import fetch from 'node-fetch';

import settings from '../config/settings';

const localStrategy = () => {
  const queryGetUserByUsername = `
    query getUserByUsername($username: String!) {
      authUser(where: { username: $username }) {
        id,
        username,
        email,
        password
      }
    }
  `;

  const client = new AwesomeGraphQLClient({
    endpoint: `${settings.GRAPHCMS_CONTENT_API}`,
    fetch,
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${settings.GRAPHCMS_ACCESS_TOKEN}`,
      },
    },
  });

  passport.use('login', new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const { authUser } = await client.request(queryGetUserByUsername, { username });

        if (!authUser) {
          throw new Error('User does no exists');
        }

        if (password !== authUser.password) {
          throw new Error('Incorrect Credentials');
        }

        done(null, authUser);
      } catch (error) {
        console.log(error);
        done(error);
      }
    },
  ));
};

export default localStrategy;
