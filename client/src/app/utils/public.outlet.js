import { Outlet } from 'react-router-dom'; 
import HeaderComponent from '../components/layout/header.component';

const PublicOutlet = ({
  children,
  ...rest
}) => {
  return (
    <>
      <HeaderComponent />
      <main>
        <Outlet/>
      </main>
    </>  
  );
};

export default PublicOutlet;