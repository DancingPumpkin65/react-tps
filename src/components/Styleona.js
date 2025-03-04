import styled from 'styled-components';

const Titros = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
  &:hover {
    background-color: #0056b3;
    color: white;
  }
`;

const Paramos = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
`;

const Bitaina = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Stylos = () => {
  return (
    <div>
      <Titros>titre</Titros>
      <Paramos>paragraphe</Paramos>
      <Bitaina>clique</Bitaina>
    </div>
  );
};

export default Stylos;
