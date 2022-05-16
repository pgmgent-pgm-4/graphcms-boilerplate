import faker from '@faker-js/faker';
import client from './graphql_client';
import { generateValueBetweenMinAndMax, generateTimestamps } from './utils';

const mutationCreateCommunity = `
mutation CreateCommunityMutation($name: String!, $description: String!, $type: CommunityType, $authUserId: ID!) {
  __typename
  createCommunity(
    data: {name: $name, description: $description, type: $type, authUser: {connect: {id: $authUserId}}}
  ) {
    id
    name
    description
    type
  }
}`;

const queryGetAuthUsers = `
query GetAuthUsers {
  authUsers {
    id
    username
    email
  }
}`;

(async () => {
  // Get all the users
  let { authUsers } = await client.request(queryGetAuthUsers);

  /*
   * Create a Community (Local Provider)
  */
  const createCommunity = async ({ name, description, type, authUserId }) => {
    try {
      const { createCommunity } = await client.request(mutationCreateCommunity, { name, description, type, authUserId });

      if (!createCommunity) {
        throw new Error(`Can't create the community with name ${createCommunity.name}!`);
      }

      console.log(`Community created with name ${createCommunity.name}!`)
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Create communities via promises
  */
  const createCommunities = async (n = 20) => {
    const promises = [];
    for (let i=0; i < n;i++) {
      promises.push(await createCommunity({name: faker.lorem.word(), description: faker.lorem.paragraph(), type: 'public', authUserId: authUsers[generateValueBetweenMinAndMax(0, authUsers.length - 1)].id }));
    }
    return await Promise.all(promises);
  };

  /*
   * Create communities
  */
  await createCommunities(40);

})();