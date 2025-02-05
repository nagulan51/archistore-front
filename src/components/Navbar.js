import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { colors } from '../styles/colors';
import { FaUserCircle } from 'react-icons/fa';

const NavBar = styled.nav`
  background-color: ${colors.navbar};
  color: ${colors.textNavbar};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;

const NavTitle = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.textNavbar};
  text-decoration: none;

  &:hover {
    color: ${colors.primary};
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;

  li a {
    text-decoration: none;
    color: ${colors.textNavbar};
    font-weight: 500;

    &:hover {
      color: ${colors.primary};
    }
  }
`;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ProfileIcon = styled(FaUserCircle)`
  font-size: 1.8rem;
  color: ${colors.textNavbar};

  &:hover {
    color: ${colors.primary};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: ${({ show }) => (show ? 'block' : 'none')};
  min-width: 150px;
  z-index: 10;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #333;
  font-weight: 500;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a token exists in localStorage to determine if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <NavBar>
      <NavTitle to="/">Archistore</NavTitle>
      <NavLinks>
        {!isLoggedIn ? (
          <li><Link to="/login">Login</Link></li>
        ) : (
          <ProfileContainer onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
            <ProfileIcon />
            <DropdownMenu show={showDropdown}>
              <DropdownItem to="/client">Dashboard</DropdownItem>
              <DropdownItem to="/files">My Files</DropdownItem>
              <DropdownItem as="button" onClick={handleLogout} style={{ border: 'none', background: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </ProfileContainer>
        )}
      </NavLinks>
    </NavBar>
  );
};

export default Navbar;