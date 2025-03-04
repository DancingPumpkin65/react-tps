import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import './index.css';
import LoginForm from './components0/LoginForm';
import Navbar from './components0/Navbar';
import HomePage from './components0/HomePage';
import CompsTFT, { CompsProvider } from './components0/CompsTFT';
import AddComp from './components0/AddComp';
import EditComp from './components0/EditComp';
import DeleteComp from './components0/DeleteComp';

const container = document.getElementById('root');
const root = createRoot(container);

const AppContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  min-height: 100vh;
  position: relative;
`;

// Global style to ensure the page takes up full height
const GlobalStyle = styled.div`
  margin: 0;
  padding: 0;
  min-height: 100vh;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);
  
  const handleLoginSuccess = () => {
    localStorage.setItem('user', JSON.stringify({ email: 'user@example.com' }));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <GlobalStyle>
        <AppContainer>
          {isLoggedIn && <Navbar onLogout={handleLogout} />}
          
          <CompsProvider>
            <Routes>
              <Route 
                path="/login" 
                element={isLoggedIn ? <Navigate to="/" /> : <LoginForm onLoginSuccess={handleLoginSuccess} />} 
              />
              
              <Route 
                path="/" 
                element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} 
              />
              
              <Route 
                path="/comps" 
                element={isLoggedIn ? <CompsTFT /> : <Navigate to="/login" />} 
              />
              
              <Route 
                path="/add-comp" 
                element={isLoggedIn ? <AddComp /> : <Navigate to="/login" />} 
              />
              
              <Route 
                path="/edit-comp/:id" 
                element={isLoggedIn ? <EditComp /> : <Navigate to="/login" />} 
              />
              
              <Route 
                path="/delete-comp/:id" 
                element={isLoggedIn ? <DeleteComp /> : <Navigate to="/login" />} 
              />
              
              <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
            </Routes>
          </CompsProvider>
        </AppContainer>
      </GlobalStyle>
    </Router>
  );
}

root.render(<App />);