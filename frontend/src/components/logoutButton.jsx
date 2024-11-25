import React from 'react';
import styles from "../styles/logoutButton.module.css"; // Fichier CSS pour le bouton de déconnexion

const LogoutButton = ({ onLogout }) => {
  return (
    <button className={styles.logoutButton} onClick={onLogout}>
      Se déconnecter
    </button>
  );
};

export default LogoutButton;
