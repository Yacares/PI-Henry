import axios from 'axios';

export function getUsers () {
 return async function (dispatch){
  const response = await axios('http://localhost:3001/dogs')
  return dispatch({
    type: "GET_USERS",
    payload: response.data,
  });
 };
}

export function getTemperaments () {
  return async function (dispatch){
   const response = await axios('http://localhost:3001/temperaments')
   return dispatch({
     type: "GET_TEMPERAMENTS",
     payload: response.data,
   });
  };
 }

export const clearAllUsers = () => {
  return {
    type: 'CLEAR_ALL_USERS', // Puedes usar cualquier tipo de acción que desees
  };
};

export const nameSearch = (name) => {
  return async (dispatch) => {
    const { data } = await axios(`http://localhost:3001/dogs?name=${name}`);

    dispatch({
      type: 'NAME_SEARCH',
      payload: data,
    });
  };
};

export const fetchDogById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`http://localhost:3001/dogs/${id}`);

      dispatch({
        type: 'DOG_BY_ID',
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const setSortBy = (sortOption) => {
    return {
      type: 'SET_SORT_BY',
      payload: sortOption, // El criterio de ordenamiento (nombre o peso)
    };
  };

  export const setFilters = (filters) => {
    return {
      type: 'SET_FILTERS',
      payload: filters, // Los filtros seleccionados
    };
  };
