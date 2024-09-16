import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Home.module.css';
import reactLogo from '../assets/images/react.png'; 

const Home = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!user) {
      navigate('/login'); 
    }
  }, [user, navigate]); 

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.headerUserInfo}>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
      <h1>Home</h1>
      <p className={styles.description}>
        Esta es la página de manejo de datos de empleados con las funciones solicitadas en el TP.
      </p>
      {}
      <img src={reactLogo} alt="React Logo" className={styles.reactIcon} />
    </div>
  );
};

export default Home;
