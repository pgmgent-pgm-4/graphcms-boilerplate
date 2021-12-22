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
  let categories, uniqueCategories;

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
    console.log(feed.items);
    categories = [...new Set(feed.items.flatMap(post => post.categories))];
    uniqueCategories = [...new Set(categories.flatMap(category => category.split(' / ')))];
    const promises = [];
    uniqueCategories.forEach((category) => {      
      promises.push(createCategory(category, faker.lorem.sentence()));
    });

    return await Promise.all(promises);
  };

  /*
   * Create categories
  */
  await createCategories();

})();

// const categoryPath = categories.find((c) => c.indexOf(category) !== -1);
//       const categoryPathElements = categoryPath.split(' / ');
//       const parentCategory = null;
//       const categoryPathIndex = categoryPathElements.findIndex(c => c === category);
//       if (categoryPathIndex > 0) {
        
//       }