import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

// Apollo client imports
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  concat,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

// React Router v6 imports
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// Custom compoments
import { settings } from './app/config';
import App from './app';

// Custom styles
import './index.css';
import { HomePage, PostDetailsPage, PostsPage } from './app/pages';
import { AuthProvider } from './app/context';
import { AdminOutlet, UserOutlet } from './app/utils';

// HTTP link to the GraphQL resource
const httpLink = new HttpLink({
  uri: settings.GRAPHCMS_CONTENT_API,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${settings.GRAPHCMS_ACCESS_TOKEN}`,
    }
  }));
  return forward(operation);
});

// Create an Apollo GraphQL client
const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="posts" element={<PostsPage />} />  
            <Route path="posts/:postId" element={<PostDetailsPage />} />
            <Route path="user" element={<UserOutlet />}>
              <Route index element ={<HomePage/>} />
              <Route path="profile" element ={<PostsPage/>} />
            </Route>
            <Route path="admin" element={<AdminOutlet />}>
              <Route index element ={<HomePage/>} />
              <Route path="posts" element ={<PostsPage/>} />
            </Route>
            <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
          </Route>
        </Routes>
      </BrowserRouter>   
    </AuthProvider> 
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
