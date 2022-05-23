import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

// React Router v6 imports
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// Custom compoments
import App from './app';

// Utilities
import { CommunitiesPage, HomePage, PostDetailsPage, PostsPage } from './app/pages';
import { AuthProvider, GraphCMSProvider } from './app/context';
import { AdminOutlet, PublicOutlet, UserOutlet } from './app/utils';

// Custom styles
import './index.css';

ReactDOM.render(
  <GraphCMSProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<PublicOutlet />}>
              <Route index element={<HomePage />} />
              <Route path="posts" element={<PostsPage />} />  
              <Route path="posts/:postId" element={<PostDetailsPage />} />
              <Route path="communities" element={<CommunitiesPage />} /> 
            </Route>            
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
  </GraphCMSProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
