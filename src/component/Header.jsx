import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Header = ({ children }) => (
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">MeetApp</Link>
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
    {children}
  </div>
);

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
