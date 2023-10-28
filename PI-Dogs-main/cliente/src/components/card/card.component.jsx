import './card.styles.css';
import React from 'react';
import { Link } from 'react-router-dom';


function Card ({user}){
const {id, name, weight,image, temperament} = user



  return (
    
<div className="card">
  <div className="card-border-top"/> 
  <div className="img">
  <img className="foto-perros" src={image} alt="imagen" />
  </div>
  <span> {name}</span>
  <p className="job"> Weight Metric:{weight.metric} kg</p>
  <p className="job"> Weight Imperial:{weight.imperial} lb</p>
  <p className="job"> Temperaments: {temperament} </p>
  <div className='contenedor-boton'>
  <Link to={`/home/${id}`}>
          <button className="boton-detail">Detail</button>
   </Link>
  </div>
</div>
  
  );
  }

export default Card;