import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from '../styles/PublicLayout.module.css';

const PublicLayout = () => {
  return (
    <div className={styles.publicLayout}>
      <header>
        <h1>TP - Final REACT</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
