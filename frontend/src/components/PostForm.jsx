import React, { useState, useEffect } from "react";
import styles from "../styles/postForm.module.css"; // Importation du module CSS
import AnnulerModification from "./AnnulerModification";

const PostForm = ({ onSubmit, post = null }) => {
  const [formData, setFormData] = useState({
    title: post ? post.title : "",
    content: post ? post.content : "",
    imageUrl: post ? post.imageUrl : "",
  });

  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState( false);  // Pour savoir si on est en mode édition ou création

  // Met à jour formData chaque fois que post change
  useEffect(() => {
    if (post) {
      // Si un post est passé en prop, on passe en mode édition
      setIsEditing(true);
      setFormData({
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl,
      });
    } else {
      // Si aucun post, on est en mode création
      setIsEditing(false);
      setFormData({
        title: "",
        content: "",
        imageUrl: "",
      });
    }
  }, [post]);  // Le formulaire se met à jour quand `post` change

  // Gérer les changements d'input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.imageUrl) {
      setError("Tous les champs sont requis.");
      return;
    }

    onSubmit(formData); // Soumettre les données du formulaire
    setError(null);
  };

  // Fonction pour annuler l'édition
  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      title: "",
      content: "",
      imageUrl: "",
    });
  };
  const mettreAJour = () => {
    setIsEditing(true);
    setFormData({
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
    });
    console.log("tt");
    
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>{isEditing ? "Modifier le post" : "Créer un post"}</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className={styles.label}>Titre</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Titre de l'article"
            className={styles.inputField}
          />
        </div>

        <div>
          <label htmlFor="content" className={styles.label}>Contenu</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Contenu de l'article"
            className={styles.textareaField}
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className={styles.label}>URL de l'image</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="URL de l'image"
            className={styles.inputField}
          />
        </div>

        <button type="submit"  className={styles.submitButton}>
          {isEditing ? "Mettre à jour" : "Créer"}
        </button>

        {/* Affichage du bouton Annuler seulement si on est en mode édition */}
        {isEditing && <AnnulerModification onCancel={handleCancel} />}
      </form>
    </div>
  );
};

export default PostForm;
