import faker from 'faker';
import fetch from 'node-fetch';
import client from './graphql_client';

const mutationCreateProject = `
mutation CreateProjectMutation($name: String!) {
  __typename
  createProject(data: {name: $name}) {
    id,
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
   * Create a Project (Local Provider)
  */
  const createProject = async ({ title, description }) => {
    try {
      const { createProject } = await client.request(mutationCreateProject, { title, description });

      if (!createProject) {
        throw new Error(`Can't create the project with name ${createProject.title}!`);
      }

      console.log(`Project created with name ${createProject.title}!`)
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Create projects via promises
  */
  const createProjects = async () => {
    const response = await fetch('https://www.gdm.gent/static/data/cases.json');
    const projects = await response.json();
    console.log(projects);
    // const tags = [...new Set(cases.flatMap(project => project.Tags))];
    const promises = [];
    // tags.forEach(async (tag) => {
    //   promises.push(await createProject({ project.Title, project.Description }));
    // });
    return await Promise.all(promises);
  };

  /*
   * Create projects
  */
  await createProjects();

})();