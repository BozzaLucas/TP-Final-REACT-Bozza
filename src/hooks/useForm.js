import { useState } from 'react';

const useForm = (initialFormData, isEditing) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? '' : prevErrors[name]
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = 'Nombre es requerido';
    if (!formData.cargo) newErrors.cargo = 'Cargo es requerido';
    if (!formData.email) newErrors.email = 'Email es requerido';
    if (!formData.telefono) newErrors.telefono = 'Teléfono es requerido';
    if (!formData.direccion) newErrors.direccion = 'Dirección es requerida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (callback) => async (e) => {
    e.preventDefault();
    if (validate()) {
      await callback();
    }
  };

  return { formData, errors, handleInputChange, handleSubmit, setFormData };
};

export default useForm;
