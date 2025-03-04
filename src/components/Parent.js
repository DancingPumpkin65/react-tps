import React, { useState } from 'react';
import Child from './Child';

const Parent = () => {
  const [message, setMessage] = useState("");

  const handleChildClick = (childMessage) => {
    setMessage(childMessage);
  };

  return (
    <div>
      <h1>composant parent</h1>
      <Child onButtonClick={handleChildClick} />
      <p>message recu de l'enfant : {message}</p>
    </div>
  );
};

export default Parent;
