import React from 'react';
import styles from './Bouton.module.css';

function Bitina({ children, onClick }) {
    return (
        <button className={styles.bouton} onClick={onClick}>
            {children}
        </button>
    );
}

export default Bitina;