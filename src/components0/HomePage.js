import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  max-width: 800px;
  margin: 140px auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: #d3d7e0;
  text-align: left;
  font-size: 40px;
  margin-bottom: 20px;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <Title>Welcome to TFT Comps Manager</Title>
    </HomeContainer>
  );
};

export default HomePage;