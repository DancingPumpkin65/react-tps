import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCompsContext } from './CompsTFT';

const Container = styled.div`
  width: 800px;
  margin: 160px auto;
  padding: 20px;
  color: #fff;
  background: rgba(15, 23, 42, 0.9);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h1`
  color: #d3d7e0;
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #d3d7e0;
`;

const Input = styled.input`
  padding: 10px;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 10px;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
`;

const ChampionSelect = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-top: 10px;
`;

const ChampionOption = styled.div`
  cursor: pointer;
  border: ${props => props.selected ? '2px solid #4f46e5' : '2px solid transparent'};
  border-radius: 4px;
  padding: 2px;
  transition: all 0.2s;
  
  img {
    width: 100%;
    border-radius: 4px;
  }
`;

const TraitsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const TraitBadge = styled.div`
  background: ${props => props.selected ? '#4f46e5' : 'rgba(30, 41, 59, 0.8)'};
  color: white;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background: ${props => props.secondary ? 'transparent' : '#4f46e5'};
  border: ${props => props.secondary ? '1px solid #4f46e5' : 'none'};
  color: white;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.secondary ? 'rgba(79, 70, 229, 0.1)' : '#3c3799'};
  }
`;

const championsData = [
  { name: "Annie", image: "https://rerollcdn.com/characters/Skin/13/Annie.png" },
  { name: "Corki", image: "https://rerollcdn.com/characters/Skin/13/Corki.png" },
  { name: "Evelynn", image: "https://rerollcdn.com/characters/Skin/13/Evelynn.png" },
  { name: "Illaoi", image: "https://rerollcdn.com/characters/Skin/13/Illaoi.png" },
  { name: "Jhin", image: "https://rerollcdn.com/characters/Skin/13/Jhin.png" },
  { name: "Kayle", image: "https://rerollcdn.com/characters/Skin/13/Kayle.png" },
  { name: "Ekko", image: "https://rerollcdn.com/characters/Skin/13/Ekko.png" },
  { name: "Ezreal", image: "https://rerollcdn.com/characters/Skin/13/Ezreal.png" },
  { name: "Jinx", image: "https://rerollcdn.com/characters/Skin/13/Jinx.png" },
  { name: "Darius", image: "https://rerollcdn.com/characters/Skin/13/Darius.png" },
  { name: "Sett", image: "https://rerollcdn.com/characters/Skin/13/Sett.png" },
  { name: "Heimerdinger", image: "https://rerollcdn.com/characters/Skin/13/Heimerdinger.png" },
  // Add more champions as needed
];

const traitOptions = ["Fast 8", "Slow Roll", "Reroll", "AP Carry", "AD Carry", "Utility"];

const EditComp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getComp, updateComp } = useCompsContext();
  const [formData, setFormData] = useState({
    name: '',
    tier: '',
    traits: [],
    champions: []
  });
  
  // Find the comp by id when component mounts
  useEffect(() => {
    const compId = parseInt(id, 10);
    const foundComp = getComp(compId);
    
    if (foundComp) {
      setFormData({
        name: foundComp.name,
        tier: foundComp.tier,
        traits: [...foundComp.traits],
        champions: [...foundComp.champions]
      });
    } else {
      // Redirect if comp not found
      navigate('/comps');
    }
  }, [id, navigate, getComp]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleChampion = (championName) => {
    if (formData.champions.includes(championName)) {
      setFormData({
        ...formData,
        champions: formData.champions.filter(name => name !== championName)
      });
    } else {
      if (formData.champions.length < 8) {
        setFormData({
          ...formData,
          champions: [...formData.champions, championName]
        });
      }
    }
  };

  const toggleTrait = (trait) => {
    if (formData.traits.includes(trait)) {
      setFormData({
        ...formData,
        traits: formData.traits.filter(t => t !== trait)
      });
    } else {
      setFormData({
        ...formData,
        traits: [...formData.traits, trait]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update comp using context function
    updateComp(parseInt(id, 10), formData);
    // Redirect back to comps list
    navigate('/comps');
  };

  return (
    <Container>
      <Title>Edit TFT Comp</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Comp Name</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Tier</Label>
          <Select
            name="tier"
            value={formData.tier}
            onChange={handleInputChange}
          >
            <option value="S">S Tier</option>
            <option value="A">A Tier</option>
            <option value="B">B Tier</option>
            <option value="C">C Tier</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label>Traits</Label>
          <TraitsContainer>
            {traitOptions.map(trait => (
              <TraitBadge 
                key={trait}
                selected={formData.traits.includes(trait)}
                onClick={() => toggleTrait(trait)}
              >
                {trait}
              </TraitBadge>
            ))}
          </TraitsContainer>
        </FormGroup>
        
        <FormGroup>
          <Label>Champions</Label>
          <ChampionSelect>
            {championsData.map(champion => (
              <ChampionOption 
                key={champion.name}
                selected={formData.champions.includes(champion.name)}
                onClick={() => toggleChampion(champion.name)}
              >
                <img src={champion.image} alt={champion.name} />
              </ChampionOption>
            ))}
          </ChampionSelect>
        </FormGroup>
        
        <ButtonGroup>
          <Button type="button" secondary onClick={() => navigate('/comps')}>
            Cancel
          </Button>
          <Button type="submit">
            Save Changes
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default EditComp;