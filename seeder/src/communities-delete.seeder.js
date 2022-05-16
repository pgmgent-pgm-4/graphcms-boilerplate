import faker from '@faker-js/faker';
import client from './graphql_client';
import { generateValueBetweenMinAndMax, generateTimestamps } from './utils';

const mutationCreateCommunity = `
mutation CreateCommunityMutation($name: String!, $description: String!, $type: CommunityType) {
  __typename
  createCommunity(
    data: {name: $name, description: $description, type: $type}
  ) {
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
  /*
  *
  */
  const getRandomBody = (n = 1) => {
    let body = '';
    for(let i = 0; i < n; i++) {
      body += `<h2>${faker.lorem.text(1)}</h2><p>${faker.lorem.paragraphs(generateValueBetweenMinAndMax(2, 10), '</p><p>')}</p>`;
    }
    return body;
  }

  const getTags = (tags, n = 1) => {
    const tagsCopy = [...tags];
    const tagsToBeInsertedIntoPost = [];
    while (tagsToBeInsertedIntoPost.length < n) {
      tagsToBeInsertedIntoPost.push(...tagsCopy.splice(generateValueBetweenMinAndMax(0, tagsCopy.length - 1), 1));
    }
    return tagsToBeInsertedIntoPost;
  }

  /*
   * Create a Community (Local Provider)
  */
  const createCommunity = async ({ name, description, type }) => {
    try {
      const { createCommunity } = await client.request(mutationCreateCommunity, { name, description, type });

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
      promises.push(await createCommunity({name: faker.lorem.word(), description: faker.lorem.paragraph(), type: 'public' }));
    }
    return await Promise.all(promises);
  };

  /*
   * Create communities
  */
  await createCommunities();

})();