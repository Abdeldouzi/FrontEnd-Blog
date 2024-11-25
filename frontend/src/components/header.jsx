import React from 'react';
import styles from '../styles/header.module.css';
import Image from 'next/image';


const Header = () => {
  

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Image
          width={100}
          height={100}
          src="https://th.bing.com/th/id/OIP.9Izv-aszItToTtEqRMSE0QHaE6?w=264&h=180&c=7&r=0&o=5&pid=1.7"
          alt="Logo"
          className={styles.logo}
        />
      </div>
      <h1 className={styles.title}>Le blog de AK</h1>

      

      
    </header>
  );
};

export default Header;
