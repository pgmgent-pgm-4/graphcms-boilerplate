import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuth } from './context';

import './App.scss';

function App() {
  // const { currentUser, signInWithEmailAndPassword} = useAuth();  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await signInWithEmailAndPassword('Eileen39', 'w84pgmGent');
  //   }
  //   fetchData();

  // }, []);

  // useEffect(() => {
  //   console.log(currentUser);
  // }, [currentUser]);

  return (
    <div className="app">  
      <Outlet />    
    </div>
  );
}

export default App;
