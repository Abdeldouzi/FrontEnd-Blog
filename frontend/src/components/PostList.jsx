import React, { useEffect, useState } from "react";
import styles from "../styles/postList.module.css"; // Assure-toi que le chemin est correct
import SupprimerPost from "../components/supprimerPost";

const PostList = ({ posts, currentUser, onEdit }) => {

  // Fonction pour supprimer un post
  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3001/articles/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Passe le token pour l'authentification
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du post.");
      }

      // Si la suppression est réussie, on met à jour les posts
      alert("Post supprimé avec succès!");
      // Mise à jour de la liste des posts dans l'interface
      // Filtrer les posts pour ne pas afficher celui supprimé
      posts = posts.filter((post) => post._id !== postId);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Impossible de supprimer le post.");
    }
  };

 
  

  return (
    <div className={styles.postList}>
      {posts.map((post) => (
        
        <div key={post._id} className={styles.postItem}>
          {/* Vérification de l'URL de l'image */}
          {post.imageUrl ? (
            <img
              src={post.imageUrl} // Vérifiez que cette URL est correcte
              alt={post.title}
              className={styles.postImage} // Applique le style de l'image
            />
          ) : (
            <p>Aucune image disponible</p> // Affiche un message si l'image n'existe pas
          )}

          <h3>{post.title}</h3>
          <p>{post.content}</p>

          {/* Affichage du nom de l'auteur */}
          {post.author  ? (
            <p className={styles.author}>Publié par: {post.author.username}</p>
          ) : (
            <p className={styles.author}>Auteur inconnu</p> // Message de secours si l'auteur est absent
          )}

          {/* Bouton Modifier */}
          <button className={styles.editButton} onClick={() => onEdit(post)}>
            Modifier
          </button>

          {/* Bouton Supprimer */}
          <SupprimerPost onDelete={handleDeletePost} postId={post._id} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
