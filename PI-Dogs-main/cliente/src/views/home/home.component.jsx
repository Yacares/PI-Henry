import { useEffect,useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getUsers,  clearAllUsers} from '../../redux/actions/action'
import Cards from '../../components/cards/cards.component';
import Navbar from '../../components/navbar/navbar.component'
import './home.styles.css';
import { useLocation } from 'react-router-dom'; 

function Home() {

  const dispatch = useDispatch();
  const allUsers = useSelector((state)=>state.allUsers);
  const [sortedAllUsers, setSortedAllUsers] = useState(null);
  const location = useLocation();
  
  

  useEffect(() => {
    if (location.pathname === '/home') {
      // Si la ubicación actual es '/home', realiza la llamada para obtener usuarios
      dispatch(getUsers());
    } else {
      // Si la ubicación es diferente a '/home', limpia el estado de allUsers
      dispatch(clearAllUsers());
    }
  }, [dispatch, location]);



  return (
    <div>
      <h2>Titulo Home</h2>
      <Navbar allUsers={allUsers} setAllUsers={setSortedAllUsers} />
      <Cards allUsers={sortedAllUsers || allUsers} />
    </div>
  );
}

export default Home;
