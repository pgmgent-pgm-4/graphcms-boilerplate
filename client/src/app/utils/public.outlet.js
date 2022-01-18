import { Outlet } from 'react-router-dom'; 

const PublicOutlet = ({
  children,
  ...rest
}) => {
  return (
    <>
      <Outlet/>
    </>  
  );
};

export default PublicOutlet;