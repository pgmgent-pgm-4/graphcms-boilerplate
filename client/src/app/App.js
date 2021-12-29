import { Outlet } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import HeaderComponent from './components/layout/header.component';

function App() {
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
