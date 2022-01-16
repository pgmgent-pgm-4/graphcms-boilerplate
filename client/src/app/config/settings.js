const settings = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  GRAPHCMS_CONTENT_API: process.env.REACT_APP_GRAPHCMS_CONTENT_API,
  GRAPHCMS_ACCESS_TOKEN: process.env.REACT_APP_GRAPHCMS_ACCESS_TOKEN,
  AUTH_KEY_LOCALSTORAGE: 'react-boilerplate-pgm-4:currentUser',
};

export default settings;