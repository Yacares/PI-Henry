import { useState, useEffect } from 'react';
import './navbar.styles.css';
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

  // Ordena los temperamentos alfabéticamente
  const sortedTemperaments = [...temperaments].sort((a, b) => a.name.localeCompare(b.name));

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

  return (
    <div>
      <h1>Navbar</h1>
      <button onClick={() => sortUsersByName(nameSortOrder === 'asc' ? 'desc' : 'asc')}>
        Ordenar Nombre {nameSortOrder === 'asc' ? 'Ascendente' : 'Descendente'}
      </button>
      <button onClick={() => sortUsersByWeight(weightSortOrder === 'asc' ? 'desc' : 'asc')}>
        Ordenar Peso {weightSortOrder === 'asc' ? 'Ascendente' : 'Descendente'}
      </button>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      <button onClick={handleCloseSearch} className="close-button">
        X
      </button>
      <select
        name="filterByTemperam"
        id="filterByTemperam"
        onChange={(e) => setSelectedTemperament(e.target.value)}
        value={selectedTemperament}
      >
        <option value="all">Todos</option>
        {sortedTemperaments.map((temperament, index) => (
          <option key={index} value={temperament.name}>
            {temperament.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Navbar;