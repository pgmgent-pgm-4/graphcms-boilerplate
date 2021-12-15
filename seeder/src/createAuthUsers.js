const mutationCreateAuthUser = `
  mutation CreateAuthUserMutation($username: String!, $email: String!, $password: String!) {
    __typename
    createAuthUser(data: {username: $username, email: $email, password: $password}) {
      id
      username
      email
      profile
    }
  }
`;
console.log(mutationCreateAuthUser);
