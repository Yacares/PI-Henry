import { useState, useEffect } from 'react';
import './navbar.styles.css';
import { Link } from 'react-router-dom';
import { getTemperaments } from '../../redux/actions/action';
import { useDispatch, useSelector } from 'react-redux';

function Navbar({ allUsers, setAllUsers }) {
  const [nameSortOrder, setNameSortOrder] = useState('asc');
  const [weightSortOrder, setWeightSortOrder] = useState('asc');
  const [searchValue, setSearchValue] = useState('');
  const [searchResultsMessage, setSearchResultsMessage] = useState('');
  const [selectedTemperament, setSelectedTemperament] = useState('all');
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.allTemperaments);

  const originalUsers = allUsers;

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const sortUsersByName = (order) => {
    const sortedUsers = [...originalUsers];
    sortedUsers.sort((a, b) => {
      if (order === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setNameSortOrder(order);
    setAllUsers(sortedUsers);
  };

  const sortUsersByWeight = (order) => {
    const sortedUsers = [...originalUsers];
    sortedUsers.sort((a, b) => {
      const weightA = parseFloat(a.weight.metric);
      const weightB = parseFloat(b.weight.metric);
      if (order === 'asc') {
        return weightA - weightB;
      } else {
        return weightB - weightA;
      }
    });
    setWeightSortOrder(order);
    setAllUsers(sortedUsers);
  };

  const handleSearch = () => {
    const nameLowerCase = searchValue.toLowerCase();
    const matchingUsers = originalUsers.filter((user) => {
      const userName = user.name.toLowerCase();
      return userName.includes(nameLowerCase);
    });

    if (matchingUsers.length === 0) {
      setSearchResultsMessage('No se encontraron resultados');
    } else {
      setSearchResultsMessage('');
    }

    setAllUsers(matchingUsers);
  };

  const handleCloseSearch = () => {
    setSearchValue('');
    setSearchResultsMessage('');
    setAllUsers(originalUsers);
  };

  // Llama a la función de filtrado automáticamente cuando cambie el valor del menú desplegable
  useEffect(() => {
    filterUsersByTemperament();
  }, [selectedTemperament]);

  const filterUsersByTemperament = () => {
    if (selectedTemperament === 'all') {
      setAllUsers(originalUsers);
    } else {
      const filteredUsers = originalUsers.filter((user) => {
        if (user.temperament) {
          return user.temperament.includes(selectedTemperament);
        } else {
          return false;
        }
      });

      if (filteredUsers.length === 0) {
        setSearchResultsMessage('No se encontraron resultados');
      } else {
        setSearchResultsMessage('');
      }

      setAllUsers(filteredUsers);
    }
  };

  // Verifica si temperaments es iterable antes de usarlo
  const sortedTemperaments = Array.isArray(temperaments) && temperaments.length > 0
    ? temperaments.sort((a, b) => a.name.localeCompare(b.name))
    : [];

    return (
      <div className='container-botones-navbar'>
        <div className='container-box'></div>

        <button className ="botones-navbar" onClick={() => sortUsersByName(nameSortOrder === 'asc' ? 'desc' : 'asc')}>
          Ordenar Nombre {nameSortOrder === 'asc' ? 'Ascendente' : 'Descendente'}
        </button>

        <button className ="botones-navbar" onClick={() => sortUsersByWeight(weightSortOrder === 'asc' ? 'desc' : 'asc')}>
          Ordenar Peso {weightSortOrder === 'asc' ? 'Ascendente' : 'Descendente'}
        </button>
        
        <div className='container-searchbar'>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className ="botones-searchbar" onClick={handleSearch}>🔍</button>
        </div>
        <button className ="botones-navbar" onClick={handleCloseSearch}>Restablecer</button>
        <select className='select-boton'
          name="filterByTemperam"
          id="filterByTemperam"
          onChange={(e) => setSelectedTemperament(e.target.value)}
          value={selectedTemperament}
        >
          <option value="all">All Temperaments</option>
          {sortedTemperaments.map((temperament, index) => (
            <option key={index} value={temperament.name}>
              {temperament.name}
            </option>
          ))}
        </select>
       
        <Link to="/create" state={{ temperaments: sortedTemperaments }}> <button className="botones-navbar">Create</button></Link>
        
        <div className="search-message">{searchResultsMessage}</div> {/* Muestra el mensaje de búsqueda */}
      </div>
    );
  }
  
  export default Navbar;