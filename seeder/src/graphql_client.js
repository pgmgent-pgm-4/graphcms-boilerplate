import { AwesomeGraphQLClient } from 'awesome-graphql-client';
import fetch from 'node-fetch';
import settings from './config/settings';

const client = new AwesomeGraphQLClient({
  endpoint: `${settings.GRAPHCMS_CONTENT_API}`,
  fetch,
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${settings.GRAPHCMS_ACCESS_TOKEN}`,
    },
  },
});

export default client;