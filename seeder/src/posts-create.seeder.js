import faker from 'faker';
import Parser from 'rss-parser';
import { htmlToSlateAST } from '@graphcms/html-to-slate-ast';
import client from './graphql_client';
import { generateValueBetweenMinAndMax, generateTimestamps } from './utils';

const mutationCreatePost = `
mutation CreatePostMutation($title: String!, $description: String!, $body: RichTextAST, $categoryName: String, $tags: [TagWhereUniqueInput!]) {
  __typename
  createPost(data: {title: $title, description: $description, body: $body, category: {connect: {name: $categoryName}}, tags: {connect: $tags}}) {
    id
    title
    description
    body {
      markdown
    }
    tags {
      name
      id
    }
    category {
      id
      name
    }
  }
}`;

const queryGetTags = `
query GetTags {
  tags {
    id
    name
  }
}`;

let parser = new Parser();

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
   * Create a Post (Local Provider)
  */
  const createPost = async ({ title, description, body, categoryName, tags }) => {
    try {
      const { createPost } = await client.request(mutationCreatePost, { title, description, body, categoryName, tags});

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
  const createPosts = async () => {
    const promises = [];

    // Get all the tags
    let { tags } = await client.request(queryGetTags);
    tags = [...tags.map(tag => { return { name: tag.name }})];

    // Get posts from tweakers RSS feed
    const feed = await parser.parseURL('https://tweakers.net/feeds/mixed.xml');
    const posts = feed.items;
    posts.forEach(async (post) => {
      const categories = post.categories[0].split(' / ');
      const categoryName = categories[categories.length - 1];
      const ast = await htmlToSlateAST(getRandomBody(generateValueBetweenMinAndMax(1, 4)));      
      
      promises.push(await createPost({title: post.title, description: post.content, body: { children: ast }, categoryName, tags: getTags(tags, generateValueBetweenMinAndMax(1, 6)) }));
    });
    
    return await Promise.all(promises);
  };

  /*
   * Create posts
  */
  await createPosts();

})();