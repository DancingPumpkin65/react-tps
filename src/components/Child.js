import React from 'react';

const Child = ({ onButtonClick }) => {
  const sendMessageToParent = () => {
    onButtonClick("bouton clique");
  };

  return (
    <div>
      <h2>composant enfant</h2>
      <button onClick={sendMessageToParent}>clique moi</button>
    </div>
  );
};

export default Child;
