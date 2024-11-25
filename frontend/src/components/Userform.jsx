import React, { useState } from "react";
import styles from "../styles/userForm.module.css";

const UserForm = ({ isSignup, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  

  const [error, setError] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic here
    if (isSignup && !formData.username) {
      setError("Username is required");
      return;
    }
    if (!formData.email || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    setError(null);
    onSubmit(formData);  // Pass form data to parent component
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>{isSignup ? "Créer un compte" : "Se connecter"}</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Si c'est l'inscription, afficher le champ "username" */}
        {isSignup && (
          <div className={styles.formGroup}>
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nom d'utilisateur"
            />
          </div>
        )}

        {/* Toujours afficher le champ email */}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        {/* Toujours afficher le champ password */}
        <div className={styles.formGroup}>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mot de passe"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          {isSignup ? "Créer un compte" : "Se connecter"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
