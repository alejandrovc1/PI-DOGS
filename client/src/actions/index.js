const axios = require('axios')
export const GET_BREEDS = 'GET_BREEDS';
export const GET_TEMPERAMENT = 'GET_TEMPERAMENT';
export const ORDER_ZA = 'ORDER_ZA';
export const ORDER_AZ = 'ORDER_AZ';
export const WEIGHT_ASC = 'WEIGHT_ASC';
export const WEIGHT_DESC = 'WEIGHT_DESC';
export const SEARCH_BREED = 'SEARCH_BREED';
export const FILTER_BY_TEMP = 'FILTER_BY_TEMP';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const GET_DETAIL = 'GET_DETAIL';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';
export const ADD_BREED = 'ADD_BREED';

const SERVER = process.env.SERVER || 'http://localhost:3001'

export const getBreeds = () => async dispatch => {
  const response = await axios.get(`${SERVER}/dogs`)
  dispatch({ type: 'GET_BREEDS', payload: response.data })
}

export const getTemps = () => async dispatch => {
  const temps = await axios.get(`${SERVER}/temperament`)
  dispatch({ type: 'GET_TEMPERAMENT', payload: temps.data })
}

export function weightAndAlpha(option) {
  return { type: option }
}

export function searchBreed(option) {
  return { type: 'SEARCH_BREED', payload: option }
}

export function filterTemp(option) {
  return { type: 'FILTER_BY_TEMP', payload: option }
}

export function filterOrigin(option) {
  return { type: 'FILTER_BY_ORIGIN', payload: option }
}

export const searchBreedDetail = (id) => async dispatch => {
  const response = await axios.get(`${SERVER}/dogs/${id}`)
  dispatch({ type: 'GET_DETAIL', payload: response.data })
}

export function addBreed(breed) {
  return async function (dispatch) {

    const response = await axios.post(
      `${SERVER}/dog`,
      breed
    );
    dispatch({ type: "ADD_BREED", payload: response });
  };
}

export const clearDetail = () => ({ type: 'CLEAR_DETAIL' })

// const fetchData = (valor) => {
//   return (dispatch) => {
//     dispatch(accionARealizar());
//     axios.get(`url/${valor}`)
//       .then(response => {
//         dispatch(accionCuandoSeaSuccess([response.data]));
//       })
//       .catch(error => {
//         dispatch(accionCuandoSeaFailure('No se encontro la data'));
//       });
//   }
// }
// export default fetchData