import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCompsContext } from './CompsTFT';

const Container = styled.div`
  width: 600px;
  margin: 160px auto;
  padding: 30px;
  color: #fff;
  background: rgba(15, 23, 42, 0.9);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  color: #d3d7e0;
  font-size: 24px;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 16px;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const CompName = styled.span`
  font-weight: bold;
  color: #FF6B6B;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background: ${props => props.danger ? '#FF4757' : 'transparent'};
  border: ${props => props.danger ? 'none' : '1px solid #d3d7e0'};
  color: white;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.danger ? '#FF6B78' : 'rgba(211, 215, 224, 0.1)'};
  }
`;

const initialComps = [
  {
    id: 1,
    name: "Academy Sentinels",
    traits: ["Fast 8", "AP Carry"],
    champions: ["Rell", "Ezreal", "Leona", "Corki", "Heimerdinger", "Illaoi", "Jayce", "Rumble"],
    tier: "S"
  },
  {
    id: 2,
    name: "Hextech Innovators",
    traits: ["Slow Roll", "AD Carry"],
    champions: ["Jinx", "Ekko", "Vi", "Sett", "Jayce", "Warwick", "Darius", "Viktor"],
    tier: "A"
  },
  {
    id: 3,
    name: "Yordle Enchanter",
    traits: ["Reroll", "Utility"],
    champions: ["Zeri", "Darius", "Vex", "Heimerdinger", "Nami", "Illaoi", "Caitlyn", "Warwick"],
    tier: "B"
  }
];

const DeleteComp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getComp, deleteComp } = useCompsContext();
  const [comp, setComp] = useState(null);
  
  // Find the comp by id when component mounts
  useEffect(() => {
    const compId = parseInt(id, 10);
    const foundComp = getComp(compId);
    
    if (foundComp) {
      setComp(foundComp);
    } else {
      // Redirect if comp not found
      navigate('/comps');
    }
  }, [id, navigate, getComp]);

  const handleDelete = () => {
    // Delete the comp using context function
    deleteComp(parseInt(id, 10));
    // Redirect back to comps list
    navigate('/comps');
  };

  if (!comp) return null;

  return (
    <Container>
      <Title>Delete Confirmation</Title>
      <Message>
        Are you sure you want to delete the comp <CompName>{comp.name}</CompName>?
        <br />
        This action cannot be undone.
      </Message>
      
      <ButtonGroup>
        <Button onClick={() => navigate('/comps')}>
          Cancel
        </Button>
        <Button danger onClick={handleDelete}>
          Delete
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default DeleteComp;