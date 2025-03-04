import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

// export default function Counter() {
//   const [count, setCount] = useState(0);

//   const increment = () => {
//     setCount(count + 1);
//   };

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h1>Compteur</h1>
//       <p style={{ fontSize: '24px' }}>Valeur actuelle : {count}</p>
//       <button 
//         onClick={increment} 
//         style={{
//           padding: '10px 20px',
//           fontSize: '16px',
//           cursor: 'pointer',
//           backgroundColor: '#4CAF50',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px'
//         }}
//       >
//         Incrémenter
//       </button>
//     </div>
//   );
// }



export default function Formulaire() {
  const [nom, setNom] = useState(''); 
  const [message, setMessage] = useState(''); 

  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (nom) {
      setMessage(`bonjour ${nom}`);
    } else {
      setMessage('veuillez entrer un nom valide');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>formulaire de bienvenue</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="entrez votre nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)} 
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '300px',
            marginBottom: '10px',
          }}
        />
        <br />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          entrer
        </button>
      </form>

      {message && (
        <p style={{ marginTop: '20px', fontSize: '20px', color: '#333' }}>
          {message}
        </p>
      )}
    </div>
  );
}

