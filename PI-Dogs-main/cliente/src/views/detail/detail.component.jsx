import './detail.styles.css';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogById } from "../../redux/actions/action"; // Asegúrate de que la acción esté importada correctamente

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
      <div>
        <h2> Name: {dogDetail.name}</h2>
        <p>ID:{dogDetail.id}</p>
        <p><img className ="foto-perro" src={dogDetail.image} alt="foto" /></p>
        <p>Height Metric: {dogDetail.height.metric}</p>
        <p>Height Imperial:{dogDetail.height.imperial}</p>
        <p>Weight Metric:{dogDetail.weight.metric}</p>
        <p>Weight Imperial:{dogDetail.weight.imperial}</p>
        <p>Temperaments: {dogDetail.temperament}</p>
        <p>Life Span:{dogDetail.lifespan}</p>
        
      </div>
    );
  }
};

export default Detail;