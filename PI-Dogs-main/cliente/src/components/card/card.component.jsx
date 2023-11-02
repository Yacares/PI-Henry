import './card.styles.css';
import React from 'react';
import { Link } from 'react-router-dom';


function Card({ user }) {
  const { id, name, weight, image, temperament } = user



  return (

    <div class="card">
      <img className="foto-perros" src={image} alt="imagen" />
      <div class="card__content">
        <p class="card__title">{name}</p>
        <p class="card__description">Weight Metric:{weight.metric} kg </p>
        <p class="card__description">Weight Imperial:{weight.imperial} lb </p>
        <p class="card__description">Temperaments: {temperament}</p>
       <div className='button-container'><button className='link-container'> <Link className='link-detail' to={`/home/${id}`}> Detail </Link>  </button> </div>
      </div>


    </div>

  );
}

export default Card;