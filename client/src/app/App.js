import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import HeaderComponent from './components/layout/header.component';
import { useAuth } from './context';

function App() {
  const { currentUser, signInWithEmailAndPassword} = useAuth();
  

  useEffect(() => {
    const fetchData = async () => {
      await signInWithEmailAndPassword('Eileen39', 'w84pgmGent');
    }
    fetchData();

  }, []);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);


  return (
    <div className="app">
      <HeaderComponent />
      <main>    
        <Outlet />    
      </main>
    </div>
  );
}

export default App;
