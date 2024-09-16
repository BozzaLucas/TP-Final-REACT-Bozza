import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Empleados.module.css';
import useForm from '../hooks/useForm';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; 

const EmpleadosPage = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, logout } = useAuth(); 
  const navigate = useNavigate(); 

  const initialFormData = {
    nombre: '',
    cargo: '',
    email: '',
    telefono: '',
    direccion: ''
  };

  useEffect(() => {
    if (!user) {
      navigate('/login'); 
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  const { formData, errors, handleInputChange, handleSubmit, setFormData } = useForm(
    initialFormData, 
    isEditing
  );

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await axios.get('http://localhost:5000/empleados');
        setEmpleados(response.data);
      } catch (err) {
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchEmpleados();
  }, []);

  useEffect(() => {
    if (selectedEmpleado) {
      setFormData(selectedEmpleado);
    } else {
      setFormData(initialFormData);
    }
  }, [selectedEmpleado, setFormData]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSave = handleSubmit(async () => {
    if (isEditing) {
      try {
        await axios.put(`http://localhost:5000/empleados/${selectedEmpleado.id}`, formData);
        const updatedEmpleados = empleados.map(emp =>
          emp.id === selectedEmpleado.id ? { ...emp, ...formData } : emp
        );
        setEmpleados(updatedEmpleados);
        setIsEditing(false);
        setSelectedEmpleado(null);
      } catch (err) {
        setError('Error al modificar el empleado');
      }
    } else {
      try {
        await axios.post('http://localhost:5000/empleados', formData);
        const response = await axios.get('http://localhost:5000/empleados');
        setEmpleados(response.data);
        setFormData(initialFormData); 
      } catch (err) {
        setError('Error al agregar el empleado');
      }
    }
  });

  const handleEdit = (empleado) => {
    setIsEditing(true);
    setSelectedEmpleado(empleado);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/empleados/${id}`);
      setEmpleados(empleados.filter(emp => emp.id !== id));
    } catch (err) {
      setError('Error al eliminar el empleado');
    }
  };

  const handleView = (empleado) => {
    setIsEditing(false);
    setSelectedEmpleado(empleado);
  };

  const filteredEmpleados = empleados.filter(emp =>
    emp.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className={styles.loading}>Cargando...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Lista de Empleados</h2>
        <button onClick={handleLogout} className={styles.logoutButton}>Cerrar sesión</button>
      </div>
      <input
        type="text"
        placeholder="Buscar empleado"
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
      />
      <form onSubmit={handleSave} className={styles.form}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          className={styles.formInput}
        />
        {errors.nombre && <p className={styles.error}>{errors.nombre}</p>}
        
        <input
          type="text"
          name="cargo"
          placeholder="Cargo"
          value={formData.cargo}
          onChange={handleInputChange}
          className={styles.formInput}
        />
        {errors.cargo && <p className={styles.error}>{errors.cargo}</p>}
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className={styles.formInput}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
        
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleInputChange}
          className={styles.formInput}
        />
        {errors.telefono && <p className={styles.error}>{errors.telefono}</p>}
        
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleInputChange}
          className={styles.formInput}
        />
        {errors.direccion && <p className={styles.error}>{errors.direccion}</p>}
        
        <button type="submit" className={styles.formButton}>
          {isEditing ? 'Modificar' : 'Agregar'}
        </button>
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cargo</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmpleados.length === 0 ? (
            <tr>
              <td colSpan="6">No hay empleados para mostrar</td>
            </tr>
          ) : (
            filteredEmpleados.map((empleado) => (
              <tr key={empleado.id}>
                <td>{empleado.nombre}</td>
                <td>{empleado.cargo}</td>
                <td>{empleado.email}</td>
                <td>{empleado.telefono}</td>
                <td>{empleado.direccion}</td>
                <td className={styles.actions}>
                  <button onClick={() => handleEdit(empleado)} className={styles.editButton}>Editar</button>
                  <button onClick={() => handleDelete(empleado.id)} className={styles.deleteButton}>Eliminar</button>
                  <button onClick={() => handleView(empleado)} className={styles.viewButton}>Ver</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedEmpleado && !isEditing && (
        <div className={styles.modal}>
          <h3>Detalles del Empleado</h3>
          <p><strong>ID:</strong> {selectedEmpleado.id}</p>
          <p><strong>Nombre:</strong> {selectedEmpleado.nombre}</p>
          <p><strong>Cargo:</strong> {selectedEmpleado.cargo}</p>
          <p><strong>Email:</strong> {selectedEmpleado.email}</p>
          <p><strong>Teléfono:</strong> {selectedEmpleado.telefono}</p>
          <p><strong>Dirección:</strong> {selectedEmpleado.direccion}</p>
          <button onClick={() => setSelectedEmpleado(null)} className={styles.closeButton}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default EmpleadosPage;
