const initialState = {
  dogs: [], // Aquí almacenarás las razas de perros obtenidas
  sortBy: null, // Criterio de ordenamiento (nombre o peso)
  filters: { temperaments: [], origin: '' }, // Filtros seleccionados (temperamentos y origen)
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SORT_BY':
      return {
        ...state,
        sortBy: action.payload,
      };
      
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.payload,
      };
      case 'GET_USERS':
        return {
          ...state,
          allUsers: action.payload, 
        };
        case 'GET_TEMPERAMENTS':
          return {
            ...state,
            allTemperaments: action.payload, 
          };
        case 'CLEAR_ALL_USERS':
          return {
            ...state,
            allUsers: [], // Borra la lista de usuarios
          };
              case "NAME_SEARCH":
                return {
                  ...state,
                  nameSearchResults: action.payload,
                };
          case "DOG_BY_ID":
            return {
              ...state,
              dogDetail: action.payload,
            };
    default:
      return state;
  }
};

export default rootReducer;