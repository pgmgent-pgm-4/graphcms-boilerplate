import { NavLink as RRNavLink } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, NavbarText, Nav, NavItem, NavLink, UncontrolledDropdown} from 'reactstrap';

import * as routes from '../../routes';

import { useAuth } from '../../context/auth.context';

const UserContextNavigation = () => {
  const { currentUser, signOut } = useAuth();

  return (
    <>
      {!!currentUser
        ? (
          <UncontrolledDropdown
            inNavbar
            nav
          >
            <DropdownToggle
              caret
              nav
            >
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Option 1
              </DropdownItem>
              <DropdownItem>
                SLA
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                TOMAAT
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        )
        : (
          <>
            <NavItem>
              <NavLink tag={RRNavLink} to={routes.AUTH_SIGN_IN}>Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to={routes.AUTH_SIGN_UP}>Sign Up</NavLink>
            </NavItem>
          </>
        )
      } 
    </>
  )
};

export default UserContextNavigation;
