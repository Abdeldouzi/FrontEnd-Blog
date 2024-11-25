import React from "react";
import styles from "../styles/supprimerPost.module.css"; // Importer le CSS module

const SupprimerPost = ({ onDelete, postId }) => {
  // Fonction pour gérer la suppression du post
  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
      onDelete(postId); // Appeler la fonction de suppression passée en prop avec l'ID du post
    }
  };

  return (
    <button onClick={handleDelete} className={styles.deleteButton}>
      Supprimer
    </button>
  );
};

export default SupprimerPost;
