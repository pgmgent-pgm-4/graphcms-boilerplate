import faker from 'faker';
import Parser from 'rss-parser';
import client from './graphql_client';
import { generateValueBetweenMinAndMax, generateTimestamps } from './utils';

const mutationCreateCategory = `
mutation CreateCategoryMutation($name: String!, $description: String!) {
  __typename
  createCategory(data: {name: $name, description: $description}) {
    id,
    name,
    description
  }
}`;

let parser = new Parser();

(async () => {
  /*
   * Create a Category (Local Provider)
  */
  const createCategory = async (name, description) => {
    try {
      const { createCategory } = await client.request(mutationCreateCategory, { name, description });

      if (!createCategory) {
        throw new Error(`Can't create the category with name ${createCategory.name}!`);
      }

      console.log(`Category created with name ${createCategory.name}!`)
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Create categories via promises
  */
  const createCategories = async () => {
    const feed = await parser.parseURL('https://tweakers.net/feeds/mixed.xml');
    let categories = [...new Set(feed.items.flatMap(post => post.categories))];
    categories = [...new Set(categories.flatMap(category => category.split(' / ')))];

    const promises = [];
    categories.forEach((category) => {
      promises.push(createCategory(category, faker.lorem.sentence()));
    });

    return await Promise.all(promises);
  };

  /*
   * Create categories
  */
  await createCategories();

})();