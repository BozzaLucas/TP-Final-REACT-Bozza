import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styles from '../styles/PrivateLayout.module.css';

const PrivateLayout = () => {
  return (
    <div className={styles.privateLayout}>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/empleados">Empleados</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default PrivateLayout;