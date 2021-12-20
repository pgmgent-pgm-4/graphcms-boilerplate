import client from './graphql_client';

const mutationDeleteAuthUser = `
mutation DeleteAuthUserMutation {
  __typename
  deleteManyAuthUsers {
    count
  }
}`;

(async () => {
  /*
   * Delete Users via promises
  */
  const deleteUsers = async () => {
    try {
      const data = await client.request(mutationDeleteAuthUser, {});
      const count = data.deleteManyAuthUsers.count;

      if (count === 0) {
        throw new Error(`Can't delete users!`);
      }

      console.log(`Amount of users deleted: ${count}!`)
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Create Models in Auth
  */
  await deleteUsers();

})();