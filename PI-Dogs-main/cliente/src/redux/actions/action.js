import axios from 'axios';

export function getUsers() {
  return async function (dispatch) {
    const response = await axios('http://localhost:3001/dogs')
    return dispatch({
      type: "GET_USERS",
      payload: response.data,
    });
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    const response = await axios('http://localhost:3001/temperaments')
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: response.data,
    });
  };
}

export const createDogs = (form) => {
  return async (dispatch) => {
    const { data } = await axios.post('http://localhost:3001/dogs', form);
    dispatch({
      type: "CREATE_DOGS",
      payload: data.message,
    });
  };
};

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


