import React, { useState } from "react";

const LumosCheckbox = () => {
  const [chosenSpells, setChosenSpells] = useState([]);
  const spells = ["Accio", "Expelliarmus", "Expecto Patronum"];

  const handleChange = (e) => {
    const { value, checked } = e.target;

    setChosenSpells((prevChosenSpells) => {
      const newChosenSpells = new Set(prevChosenSpells);

      if (checked) {
        newChosenSpells.add(value);
      } else {
        newChosenSpells.delete(value);
      }

      return Array.from(newChosenSpells);
    });
  };

  return (
    <div>
      <h1>Spells func</h1>
      {spells.map((spell, index) => (
        <label key={index}>
          <input type="checkbox" name="spells" value={spell} checked={chosenSpells.includes(spell)} onChange={handleChange} />
          {spell}
        </label>
      ))}
      <p>Spells chosen: {chosenSpells.join(", ") || "no spell"}</p>
    </div>
  );
};

export default LumosCheckbox;
