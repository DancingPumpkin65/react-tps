import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogoImg = styled.img`
  height: 32px;
  margin-right: 10px;
`;

const NavContainer = styled.nav`
  background-color: rgba(15, 23, 42, 0.9);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 20px;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  height: 70px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: #d3d7e0;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  
  &:hover {
    color: white;
  }
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: 1px solid #d3d7e0;
  color: #d3d7e0;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(211, 215, 224, 0.1);
    color: white;
  }
`;

const Navbar = ({ onLogout }) => {
  return (
    <NavContainer>
      <NavContent>
        <LogoImg src="/brand.svg" alt="TFTactics Logo" />
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/comps">View Comps</NavLink>
          <NavLink to="/add-comp">Add New Comp</NavLink>
          {onLogout && <LogoutButton onClick={onLogout}>Logout</LogoutButton>}
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;
