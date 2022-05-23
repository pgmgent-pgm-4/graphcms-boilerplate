import { Outlet } from 'react-router-dom'; 
import Header from './Header';

const PublicLayout = ({
  children,
  ...rest
}) => {
  return (
    <>
      <Header />
      <main>
        <Outlet/>
      </main>
    </>  
  );
};

export default PublicLayout;