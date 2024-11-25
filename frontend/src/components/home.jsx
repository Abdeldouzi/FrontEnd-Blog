import React, { useState, useEffect } from "react";
import UserForm from "../components/UserForm";
import Header from "../components/Header";

import LogoutButton from "../components/LogoutButton";
import PostForm from "../components/PostForm"; // Composant pour créer/modifier un post
import PostList from "../components/PostList"; // Composant pour afficher les posts
import AnnulerModification from "../components/annulerModification"; // Composant pour afficher les posts
import styles from "../styles/home.module.css";

const Home = () => {
  const [isSignup, setIsSignup] = useState(false); // Permet de basculer entre Connexion/Inscription
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Gestion de l'authentification
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]); // Liste des posts
  const [editingPost, setEditingPost] = useState(null); // Article en cours d'édition

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié en récupérant le token
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    // Récupérer les articles à chaque fois que l'état d'authentification change
    fetchArticles();
  }, [isAuthenticated]);

  // Fonction pour récupérer les articles
  const fetchArticles = async () => {
    try {
      const response = await fetch("http://localhost:3001/articles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Passer le token si disponible
        },
      })

      const data = await response.json();
      console.log("Données récupérées:", data); // Vérifiez la structure des données ici

      if (Array.isArray(data)) {
        setPosts(data); // Si les articles sont dans un tableau
      } else {
        setError("Les articles sont dans un format incorrect.");
      }
    } catch (error) {
      setError("Erreur lors de la récupération des articles.");
    }
  };

  // Fonction pour soumettre un article (création ou modification)
  const handlePostSubmit = async (formData) => {
    try {
      const method = editingPost ? "PUT" : "POST";
      const url = editingPost
        ? `http://localhost:3001/articles/${editingPost._id}`
        : "http://localhost:3001/articles";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la soumission de l'article.");
      }

      const article = await response.json();

      // Mettre à jour la liste des articles après la soumission
      if (editingPost) {
        setPosts(
          posts.map((post) => (post._id === article._id ? article : post))
        );
      } else {
        setPosts([article, ...posts]);
      }

      setEditingPost(null); // Réinitialiser l'édition
    } catch (error) {
      setError(error.message);
    }
  };

  // Fonction pour supprimer un article
  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3001/articles/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'article.");
      }

      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      setError(error.message);
    }
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setMessage("");
  };

  // Fonction pour gérer l'envoi du formulaire de connexion / inscription
  const handleFormSubmit = async (formData) => {
    try {
      const url = isSignup
        ? "http://localhost:3001/users/signup" // Inscription
        : "http://localhost:3001/users/signin"; // Connexion

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Something went wrong");
      }

      const result = await response.json();
      console.log("Token reçu du backend:", result.token); // Log pour vérifier le token

      // Enregistrer le token dans le localStorage
      localStorage.setItem("token", result.token);
      setIsAuthenticated(true);
      setMessage(isSignup ? "Compte créé avec succès!" : "Connexion réussie!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <h2>Bienvenue sur le blog !</h2>

        {/* Affichage en fonction de l'état d'authentification */}
        {!isAuthenticated ? (
          <>
            <button
              onClick={() => setIsSignup((prev) => !prev)}
              className={styles.toggleButton}
            >
              {isSignup ? "Se connecter" : "Créer un compte"}
            </button>
            {error && <p className={styles.error}>{error}</p>}
            {message && <p className={styles.message}>{message}</p>}
            <UserForm isSignup={isSignup} onSubmit={handleFormSubmit} />
          </>
        ) : (
          <>
            <LogoutButton onLogout={handleLogout} />
            

            {/* Affichage du formulaire de création ou modification d'article */}
            <PostForm onSubmit={handlePostSubmit} post={editingPost} />
            
            
            {/* Affichage de la liste des articles */}
            <PostList
              posts={posts}
              onDelete={handleDeletePost}
              onEdit={setEditingPost} // Permet de passer en mode édition
            />
          </>
        )}

        {/* Affichage des posts pour les utilisateurs non authentifiés */}
        {isAuthenticated || (
          <PostList
            posts={posts}
            onDelete={null} // Pas de possibilité de supprimer pour les non-authentifiés
            onEdit={null} // Pas de possibilité d'éditer pour les non-authentifiés
          />
        )}
      </main>
    </div>
  );
};

export default Home;
