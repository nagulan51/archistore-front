import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../styles/colors";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/img/logo1.png";

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
  display: ${(props) => (props.show ? "block" : "none")}; /* ✅ Fixed boolean prop */
  min-width: 180px;
  z-index: 10;
  padding: 5px 0;
`;

const DropdownItem = styled.div`
  padding: 10px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <NavBar>
      <NavTitle to="/">
        <img src={logo} alt="logo" style={{ width: "250px", height: "50px" }} />
      </NavTitle>
      <NavLinks>
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/plans">Plans</Link>
            </li>
          </>
        ) : (
          <ProfileContainer ref={dropdownRef}>
            <ProfileIcon onClick={() => setShowDropdown(!showDropdown)} />
            <DropdownMenu show={showDropdown}>
              <DropdownItem onClick={() => { navigate("/dashboard"); setShowDropdown(false); }}>Dashboard</DropdownItem>
              <DropdownItem onClick={() => { navigate("/buy-storage"); setShowDropdown(false); }}>Buy More Storage</DropdownItem>
              <DropdownItem onClick={() => { navigate("/profile"); setShowDropdown(false); }}>Profile</DropdownItem>
              <DropdownItem onClick={handleLogout}>Sign Out</DropdownItem>
            </DropdownMenu>
          </ProfileContainer>
        )}
      </NavLinks>
    </NavBar>
  );
};

export default Navbar;
