import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createDogs } from '../../redux/actions/action';
import { Link } from 'react-router-dom';
import './create.styles.css';



function DogsCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const temperaments = location.state && location.state.temperaments;

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    minLifespan: '',
    maxLifespan: '',
    temperaments: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTemperamentChange = (e) => {
    const temperamentId = e.target.value;
    if (!formData.temperaments.includes(temperamentId)) {
      setFormData({
        ...formData,
        temperaments: [...formData.temperaments, temperamentId],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(createDogs(formData))
        .then(() => {
          alert('Perro creado con éxito.');
          navigate('/home');
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateFormData = (data) => {
    const errors = {};

    if (!data.name) {
      errors.name = 'El nombre es obligatorio';
    }

    // Add additional validation as needed for other fields.

    return errors;
  };

  return (
    <div className='container-general-create'>
      
      <div className='img-container-create' ><img className='img-create' src="https://www.petbarn.com.au/petspot/app/uploads/2016/08/63.-Miniature-Dachshund1.png" alt="" /></div>
    <div className="dogs-create">
    <div className='arrow-container-create' ><Link className='link-home' to={`/home`} ><img className='flecha-back-create' src="https://www.svgrepo.com/show/500894/home.svg" alt="back" /></Link></div>
      <h1>Crear Perro</h1>
      <form onSubmit={handleSubmit}>
        <div className='labels-create'>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
          <label>Imagen (URL):</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          {errors.image && <p>{errors.image}</p>}
      
       
          <label>Altura Mínima (cm):</label>
          <input
            type="number"
            name="minHeight"
            value={formData.minHeight}
            onChange={handleChange}
          />
       
        
          <label>Altura Máxima (cm):</label>
          <input
            type="number"
            name="maxHeight"
            value={formData.maxHeight}
            onChange={handleChange}
          />
       
      
          <label>Peso Mínimo (kg):</label>
          <input
            type="number"
            name="minWeight"
            value={formData.minWeight}
            onChange={handleChange}
          />
       
          <label>Peso Máximo (kg):</label>
          <input
            type="number"
            name="maxWeight"
            value={formData.maxWeight}
            onChange={handleChange}
          />
        
       
          <label>Años de Vida Mínimos:</label>
          <input
            type="number"
            name="minLifespan"
            value={formData.minLifespan}
            onChange={handleChange}
          />
       
       
          <label>Años de Vida Máximos:</label>
          <input
            type="number"
            name="maxLifespan"
            value={formData.maxLifespan}
            onChange={handleChange}
          />
      
          <label>Temperamentos:</label>
          <select
            onChange={handleTemperamentChange}
            multiple
          >
            {temperaments &&
              temperaments.map((temperament, index) => (
                <option key={index} value={temperament.id}>
                  {temperament.name}
                </option>
              ))}
          </select>
          {errors.temperaments && <p>{errors.temperaments}</p>}
        </div>
        <button type="submit">Crear Raza</button>
      </form>
    </div>
    </div>
  );
}

export default DogsCreate;