import { useState, useEffect } from "react";

function Compteur() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `Compteur ${count} fois`;
        console.log("Composant monte");
    }, []);

    return (
        <div>
            <h1>Compteur</h1>
            <p>Vous avez cliqué {count} fois</p>
            <button onClick={() => setCount(count + 1)}>Cliquez ici</button>
        </div>
    );
}

export default Compteur;