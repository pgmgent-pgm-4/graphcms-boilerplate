import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import settings from '../config/settings'

const AuthContext = createContext(null);
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem(settings.AUTH_KEY_LOCALSTORAGE)));

  useEffect(() => {
    localStorage.setItem(settings.AUTH_KEY_LOCALSTORAGE, JSON.stringify(currentUser));
  }, [currentUser]);

  const signInWithEmailAndPassword = async (email, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email,
          password: password,
        })
      });
      const user = await response.json();      
      if (user) {
        setCurrentUser(user);      
      }      
    } catch (error) {
      console.log(error);
    }    
  };

  const signOut = async () => {
    try {
      setCurrentUser(null); 
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentUser)
      });  
      const userLoggedOut = await response.json();
    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <AuthContext.Provider value={{currentUser, signInWithEmailAndPassword, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthContext,
  AuthProvider,
  useAuth,
};