import './detail.styles.css';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogById } from "../../redux/actions/action";
import { Link } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams(); // Accedemos al ID de la URL

  const dispatch = useDispatch();
  const dogDetail = useSelector((state) => state.dogDetail);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchDogById(id)) // Usamos el ID de la URL en la acción
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        alert("Ups! Tuvo un error al mostrar el dog: " + error.message);
        setLoading(false);
      });
  }, [dispatch, id]); // Incluimos 'dispatch' y 'id' en el arreglo de dependencias Asegúrate de incluir 'id' en las dependencias para que se actualice cuando cambia

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    return (
      <div className='container-general-detail'>
        
        <div className='arrow-container' ><Link  to={`/home`} ><img className='flecha-back' src="https://www.svgrepo.com/show/500894/home.svg" alt="back" /></Link></div>
        
      <div className='container-card-detail'>
       <img className ="foto-perro-detail" src={dogDetail.image} alt="foto" />
        <div className='container-info-detail'>
        <h2> {dogDetail.name}</h2>
        <li className='lista-datos'>
        <p>ID: {dogDetail.id}</p>
        <p>Height Metric: {dogDetail.height.metric} cm</p>
        <p>Height Imperial: {dogDetail.height.imperial} in</p>
        <p>Weight Metric: {dogDetail.weight.metric} kg</p>
        <p>Weight Imperial: {dogDetail.weight.imperial} lb</p>
        <p>Life Span: {dogDetail.lifespan}</p>
        </li>
        <h3>Temperaments: <br />{dogDetail.temperament}</h3>
        </div>
      </div>
      </div>
    );
  }
};

export default Detail;