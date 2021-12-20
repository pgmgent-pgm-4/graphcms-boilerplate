import client from './graphql_client';

const mutationDeleteCollection = (collectionType, collectionTypePluralize) => {
  return `
  mutation Delete${collectionTypePluralize}Mutation {
    __typename
    deleteMany${collectionTypePluralize} {
      count
    }
  }`;
};


/*
 * Delete Collection via promises
*/
const deleteCollection = async (collectionType, collectionTypePluralize) => {
  try {
    const mutation = mutationDeleteCollection(collectionType, collectionTypePluralize);
    const data = await client.request(mutation, {});
    const count = data[`deleteMany${collectionTypePluralize}`].count;

    if (count === 0) {
      throw new Error(`Can't delete ${collectionType}!`);
    }

    console.log(`Amount of ${collectionTypePluralize} deleted: ${count}!`)
  } catch (error) {
    console.log(error);
  }
};


/*
* Anonymous function
*/
(async () => {
  try {
    const collectionType = process.argv[2];
    const collectionTypePluralize = process.argv[3];

    await deleteCollection(collectionType, collectionTypePluralize);
  } catch (err) {
    console.log(err);
  }
})();