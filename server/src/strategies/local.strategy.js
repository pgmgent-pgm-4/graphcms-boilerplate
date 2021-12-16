import passport from 'passport';
import { Strategy } from 'passport-local';

import { AwesomeGraphQLClient } from 'awesome-graphql-client';
import fetch from 'node-fetch';

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
    endpoint: 'https://api-eu-central-1.graphcms.com/v2/ckt4tbuzn1dt201z04hct50a9/master',
    fetch, fetchOptions: { 
      headers: {
        "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2Mzk2Njk1MTAsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NrdDR0YnV6bjFkdDIwMXowNGhjdDUwYTkvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiZjJlMDU5YjEtNDQ1NC00MjgxLWEzNGItZjUxMjYyNmE5ZDA0IiwianRpIjoiY2t4OTR3M2J3MGpxbDAxeGk1NWM3NzcyNSJ9.PbGfOP9GPvNb_UUInsSYpH3bxFxPCoqwViuY-UOQwALlk-mXSvPWEG3HKIDvBdTkQFUH27OZgoUuglAsfoxcDWuBaTlj8NfwqLkOioF9NC6Bau7i5UTJr91Tzfj9oVZw9m6ycQV6i2KXerDdhP5wDPT5dZ9VbmoLFlVizDQ3w1sAx6Tw4kyRnq8LvRIsTFAY3k5gpbZq2bRIgNcJea-fQvGQ-lSz-0-fkhZReQTvpK_0eTKAVV_JcYJgPQY0mdfLoBFsSoqmT3uPblucUvz4db2Zaw9BbJISDRkogeNgQKqy1RKI-FdzC-m0vgv3V6y9jOE77xANEW0xgH7YzDSioZ1YF96q-DP3Q1_A8rlI-9FkdxkpYRRiRCtPcJmvLCo5o43G26xMvkgbyJRZW7dMZ_-ccjJlIN3s1RrjXD_fA7-JAm3XJaSTko_GQeK3m6xfYXfV83Gz0V61DVybZWlvJHauaZKSQCcjhhZOQ6qJ6eKbQe4N-U7gdWZaOPkoTsQUe7NeipLeUU_tLdBkJJItc3Rr7FMugwGT7_wJyXPEsHdwYy7mfRLDI9ROdzT2hez1ui8UFnjy2oDTsewqgOEU0lLSMv19iHh9ibBPHZTv0gH_9MF7ksJXGJFZ2WDwcvo1UogWTMLNL6trkzKYbQOKrCwlQ7_hwVcXyvXbZH5cT3o"
      }
    }
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
        done(error);
      }
    }
  ));
};

export default localStrategy;
