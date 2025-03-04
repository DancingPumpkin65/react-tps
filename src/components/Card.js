import React from "react";

const CardMaxOut = () => {
  const cardMINOTOS = {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    maxWidth: "300px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    backgroundColor: "#f9f9f9"
  };

  const titilesoDesu = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333"
  };

  const pirateRat = {
    fontSize: "1rem",
    color: "#666"
  };

  return (
    <div style={cardMINOTOS}>
      <h2 style={titilesoDesu}>Titre de la Carte</h2>
      <p style={pirateRat}>Ceci est un paragraphe de démonstration dans la carte.</p>
    </div>
  );
};

export default CardMaxOut;
