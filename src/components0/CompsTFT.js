import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CompsContainer = styled.div`
  width: 1000px;
  margin: 260px auto;
  padding: 20px;
  color: #fff;
`;

const Title = styled.h1`
  color: #d3d7e0;
  text-align: left;
  font-size: 24px;
  margin-bottom: 20px;
`;

const CompList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CompCard = styled.div`
  background: rgba(15, 23, 42, 0.9);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.1);
  gap: 15px;

  &:hover {
    background: rgba(30, 41, 59, 0.9);
  }
`;

const CompDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CompHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CompTitle = styled.h2`
  font-size: 18px;
  color: #d3d7e0;
  margin: 0;
`;

const TraitsList = styled.div`
  display: flex;
  gap: 5px;
  margin: 5px 0;
`;

const Trait = styled.span`
  background: #334155;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  color: #d3d7e0;
`;

const Champions = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;
`;

const ChampionIcon = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 4px;
  background: #1e293b;
  padding: 3px;
`;

const TierBadge = styled.div`
  background: ${props => {
    switch(props.tier) {
      case 'S': return '#ff4c4c';
      case 'A': return '#ff9f1c';
      case 'B': return '#4f46e5';
      case 'C': return '#4b5563';
      default: return '#4b5563';
    }
  }};
  color: white;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 4px;
  flex-shrink: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ActionButton = styled(Link)`
  padding: 6px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  background-color: ${props => props.danger ? 'rgba(255, 86, 86, 0.2)' : 'rgba(79, 70, 229, 0.2)'};
  color: ${props => props.danger ? '#ff5656' : '#4f46e5'};
  border: 1px solid ${props => props.danger ? '#ff5656' : '#4f46e5'};
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.danger ? 'rgba(255, 86, 86, 0.4)' : 'rgba(79, 70, 229, 0.4)'};
  }
`;

const AddButton = styled(Link)`
  margin-bottom: 20px;
  display: inline-block;
  padding: 10px 16px;
  background-color: #4f46e5;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #4338ca;
  }
`;

// Champion data (make it available at the module level)
export const championsData = [
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
  { name: "Jayce", image: "https://rerollcdn.com/characters/Skin/13/Jayce.png" },
  { name: "Leona", image: "https://rerollcdn.com/characters/Skin/13/Leona.png" },
  { name: "Nami", image: "https://rerollcdn.com/characters/Skin/13/Nami.png" },
  { name: "Zeri", image: "https://rerollcdn.com/characters/Skin/13/Zeri.png" },
  { name: "Vex", image: "https://rerollcdn.com/characters/Skin/13/Vex.png" },
  { name: "Akali", image: "https://rerollcdn.com/characters/Skin/13/Akali.png" },
  { name: "Gwen", image: "https://rerollcdn.com/characters/Skin/13/Gwen.png" },
  { name: "Lux", image: "https://rerollcdn.com/characters/Skin/13/Lux.png" },
  { name: "Rell", image: "https://rerollcdn.com/characters/Skin/13/Rell.png" },
  { name: "Senna", image: "https://rerollcdn.com/characters/Skin/13/Senna.png" },
  { name: "Vi", image: "https://rerollcdn.com/characters/Skin/13/Vi.png" },
  { name: "Kaisa", image: "https://rerollcdn.com/characters/Skin/13/Kaisa.png" },
  { name: "Rumble", image: "https://rerollcdn.com/characters/Skin/13/Rumble.png" },
  { name: "Warwick", image: "https://rerollcdn.com/characters/Skin/13/Warwick.png" },
  { name: "Sylas", image: "https://rerollcdn.com/characters/Skin/13/Sylas.png" },
  { name: "Caitlyn", image: "https://rerollcdn.com/characters/Skin/13/Caitlyn.png" },
  { name: "Viktor", image: "https://rerollcdn.com/characters/Skin/13/Viktor.png" }
];

// Trait options that can be used across components
export const traitOptions = ["Fast 8", "Slow Roll", "Reroll", "AP Carry", "AD Carry", "Utility"];

// Load comps from localStorage or use initial data
const getInitialComps = () => {
  const savedComps = localStorage.getItem('tftComps');
  return savedComps ? JSON.parse(savedComps) : [
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
};

// Create a context to share comp data between components
const CompsContext = React.createContext();

export const useCompsContext = () => React.useContext(CompsContext);

export const CompsProvider = ({ children }) => {
  const [comps, setComps] = useState(getInitialComps());

  // Save comps to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tftComps', JSON.stringify(comps));
  }, [comps]);

  const addComp = (comp) => {
    // Generate a new ID
    const newId = comps.length > 0 ? Math.max(...comps.map(c => c.id)) + 1 : 1;
    const newComp = { ...comp, id: newId };
    setComps([...comps, newComp]);
    return newId;
  };

  const updateComp = (id, updatedComp) => {
    setComps(comps.map(comp => comp.id === id ? { ...updatedComp, id } : comp));
  };

  const deleteComp = (id) => {
    setComps(comps.filter(comp => comp.id !== parseInt(id, 10)));
  };

  const getComp = (id) => {
    return comps.find(comp => comp.id === parseInt(id, 10));
  };

  return (
    <CompsContext.Provider value={{ comps, addComp, updateComp, deleteComp, getComp, championsData, traitOptions }}>
      {children}
    </CompsContext.Provider>
  );
};

const CompsTFT = () => {
  const { comps } = useCompsContext();

  // Helper function to find champion data
  const getChampionData = (championName) => {
    return championsData.find(c => c.name === championName);
  };

  return (
    <CompsContainer>
      <Title>TFT Meta Team Comps Tier List</Title>
      <AddButton to="/add-comp">+ Add New Comp</AddButton>
      <CompList>
        {comps.map(comp => (
          <CompCard key={comp.id}>
            <TierBadge tier={comp.tier}>{comp.tier}</TierBadge>
            <CompDetails>
              <CompHeader>
                <CompTitle>{comp.name}</CompTitle>
              </CompHeader>
              <TraitsList>
                {comp.traits.map(trait => (
                  <Trait key={trait}>{trait}</Trait>
                ))}
              </TraitsList>
              <Champions>
                {comp.champions.map((championName, index) => {
                  const champion = getChampionData(championName);
                  return champion ? (
                    <ChampionIcon 
                      key={`${comp.id}-${championName}-${index}`} 
                      src={champion.image} 
                      alt={championName} 
                      onError={(e) => {
                        console.error(`Failed to load image for ${championName}`);
                        e.target.src = "https://via.placeholder.com/45";
                      }}
                    />
                  ) : null;
                })}
              </Champions>
            </CompDetails>
            <ActionButtons>
              <ActionButton to={`/edit-comp/${comp.id}`}>Edit</ActionButton>
              <ActionButton to={`/delete-comp/${comp.id}`} danger>Delete</ActionButton>
            </ActionButtons>
          </CompCard>
        ))}
      </CompList>
    </CompsContainer>
  );
};

export default CompsTFT;