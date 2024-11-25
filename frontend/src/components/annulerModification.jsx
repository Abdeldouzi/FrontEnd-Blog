// AnnulerModification.jsx
import React from "react";
import styles from "../styles/annulerM.module.css"; // Importer le CSS module

const AnnulerModification = ({ onCancel }) => {
  return (
    <button onClick={onCancel} className={styles.button}>
      Annuler
    </button>
  );
};

export default AnnulerModification;
