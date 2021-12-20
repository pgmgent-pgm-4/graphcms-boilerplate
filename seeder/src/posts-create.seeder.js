import faker from 'faker';
import Parser from 'rss-parser';
import client from './graphql_client';
import { generateValueBetweenMinAndMax, generateTimestamps } from './utils';

const mutationCreateAuthUser = `
mutation CreateAuthUserMutation($username: String!, $email: String!, $password: String!) {
  __typename
  createAuthUser(data: {username: $username, email: $email, password: $password}) {
    id,
    username,
    email
  }
}`;

let parser = new Parser();

(async () => {
  /*
   * Create a Post (Local Provider)
  */
  const createUser = async ({}) => {
    try {
      const { createAuthUser } = await client.request(mutationCreateAuthUser, { username, email, password });

      if (!createAuthUser) {
        throw new Error(`Can't create the user with username ${createAuthUser.username}!`);
      }

      console.log(`User created with username ${createAuthUser.username}!`)
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Create posts via promises
  */
  const createPosts = async (n = 20) => {
    const promises = [];
    for (let i=0; i < n;i++) {
      // const gender = generateValueBetweenMinAndMax(0, 1);
      // const firstName = faker.name.firstName(gender);
      // const lastName = faker.name.lastName(gender);
      // promises.push(await createUser(faker.internet.userName(firstName, lastName), faker.internet.email(firstName, lastName), 'w84pgmGent'));
      
      const feed = await parser.parseURL('https://tweakers.net/feeds/mixed.xml');
      console.log(feed);
    }
    return await Promise.all(promises);
  };

  /*
   * Create posts
  */
  await createPosts(16);

})();