import faker from 'faker';
import client from './graphql_client';

const mutationCreateTag = `
mutation CreateTagMutation($name: String!) {
  __typename
  createTag(data: {name: $name}) {
    id,
    name
  }
}`;

(async () => {
  /*
   * Create a Tag (Local Provider)
  */
  const createTag = async (name) => {
    try {
      const { createTag } = await client.request(mutationCreateTag, { name });

      if (!createTag) {
        throw new Error(`Can't create the tag with name ${createTag.name}!`);
      }

      console.log(`Tag created with name ${createTag.name}!`)
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Create tags via promises
  */
  const createTags = async (n = 100) => {
    const promises = [];
    for (let i=0; i < n;i++) {
      promises.push(await createTag(faker.lorem.word()));
    }
    return await Promise.all(promises);
  };

  /*
   * Create tags
  */
  await createTags();

})();