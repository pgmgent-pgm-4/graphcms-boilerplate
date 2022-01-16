import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('react-boilerplate-pgm-4:currentUser')));

  useEffect(() => {
    localStorage.setItem('react-boilerplate-pgm-4:currentUser', JSON.stringify(currentUser));
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
    // setCurrentUser(null); 
    // return await auth.signOut();
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