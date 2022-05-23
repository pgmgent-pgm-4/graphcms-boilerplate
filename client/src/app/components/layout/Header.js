import { NavLink as RRNavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, NavLink, NavbarToggler, Collapse } from 'reactstrap';

// Custom components
import Navigation from './Navigation';

const Header = () => {
  return (
    <header className="header">
      <Navbar
        color="light"
        expand="md"
        light
      >
        <NavbarBrand tag={RRNavLink} to="/home">
          PGM Platform
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck(){}} />
        <Collapse navbar>
          <Navigation/>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default Header;