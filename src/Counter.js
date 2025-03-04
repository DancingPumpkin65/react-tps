import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Compteur</h1>
      <p style={{ fontSize: '24px' }}>Valeur actuelle : {count}</p>
      <button 
        onClick={increment} 
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Incrémenter
      </button>
    </div>
  );
}
