import { Navigate, Outlet } from 'react-router-dom'; 

import { useAuth } from '../context';
import { AUTH_SIGN_IN } from '../routes';

const AuthOutlet = ({
  children,
  ...rest
}) => {
  const { currentUser } = useAuth();

  return (
    <>
      <Outlet />
    </>     
  );
};

export default AuthOutlet;