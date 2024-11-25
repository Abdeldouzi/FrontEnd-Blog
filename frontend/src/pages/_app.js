import "../styles/globals.css"; // Assure-toi que ce fichier existe pour les styles globaux
import React from "react";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
