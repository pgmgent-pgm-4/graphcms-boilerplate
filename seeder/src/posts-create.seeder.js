import faker from '@faker-js/faker';
import { htmlToSlateAST } from '@graphcms/html-to-slate-ast';

import client from './graphql_client';
import { generateValueBetweenMinAndMax, generateTimestamps } from './utils';

const mutationCreatePost = `
mutation CreatePostMutation($title: String!, $body: RichTextAST, $authUserId: ID!, $communities: [CommunityWhereUniqueInput!], $tags: [TagWhereUniqueInput!]) {
  __typename
  createPost(data: {title: $title, body: $body, authUser: {connect: {id: $authUserId}}, communities: {connect: $communities}, tags: {connect: $tags}}) {
    id
    title
    body {
      markdown
    }
    tags {
      name
      id
    }
    communities {
      id
      name
    }
    authUser {
      id
      username
      email
    }
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

const queryGetCommunities = `
query GetCommunities {
  communities {
    id
    name
  }
}`;

const queryGetTags = `
query GetTags {
  tags {
    id
    name
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

  // Get all the users
  let { authUsers } = await client.request(queryGetAuthUsers);
  // Get all the communities
  let { communities } = await client.request(queryGetCommunities);
  // Get all the tags
  let { tags } = await client.request(queryGetTags);
  tags = [...tags.map(tag => { return { name: tag.name }})];

  /*
   * Create a Article = Post (Local Provider)
  */
  const createArticle = async ({ title, body, authUserId, communities, tags }) => {
    try {
      const { createPost } = await client.request(mutationCreatePost, { title, body, authUserId, communities, tags });

      if (!createPost) {
        throw new Error(`Can't create the post with title ${createPost.title}!`);
      }

      console.log(`Post created with title ${createPost.title}!`)
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
      const authUserId = authUsers[generateValueBetweenMinAndMax(0, authUsers.length - 1)].id;
      const community = communities[generateValueBetweenMinAndMax(0, communities.length - 1)];
      const ast = await htmlToSlateAST(getRandomBody(generateValueBetweenMinAndMax(1, 4))); 
      
      promises.push(await createArticle({title: faker.lorem.sentence(generateValueBetweenMinAndMax(4, 10)), body: { children: ast }, authUserId: authUserId, communities: [community], tags: getTags(tags, generateValueBetweenMinAndMax(1, 6)) }));
    };
    
    return await Promise.all(promises);
  };

  /*
   * Create posts
  */
  await createPosts(200);

})();