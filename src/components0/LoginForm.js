import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 460px;
  margin: 120px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.9);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  color: white;
  text-align: center;
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h2`
  color: #ffd700;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #ddd;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #444;
  border-radius: 6px;
  background: #1e293b;
  color: white;
  font-size: 16px;
  outline: none;
  transition: 0.3s;

  &:focus {
    border-color: #ffd700;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(90deg, #5383e8, #4070d0);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: bold;

  &:hover {
    background: linear-gradient(90deg, #4070d0, #5383e8);
  }
`;

const ErrorMessage = styled.p`
  color: #ff4040;
  margin: 5px 0;
`;

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const users = [
    { email: 'user@example.com', password: 'password123' },
    { email: 'admin@example.com', password: 'admin123' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('user', JSON.stringify({ email: user.email }));
      onLoginSuccess();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <FormContainer>
      <Title>TFT Comps Manager - Login</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Button type="submit">Login</Button>
      </form>
    </FormContainer>
  );
};

export default LoginForm;