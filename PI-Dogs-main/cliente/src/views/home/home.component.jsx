import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, clearAllUsers } from '../../redux/actions/action'
import Cards from '../../components/cards/cards.component';
import Navbar from '../../components/navbar/navbar.component'
import './home.styles.css';
import { useLocation } from 'react-router-dom';

function Home() {

  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
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
    <div className='general-container'>
      <div className='container-hero'>
      <div className='img-container'><img className="img-hero" src="https://parspng.com/wp-content/uploads/2023/01/dogpng.parspng.com-9.png" alt="" /></div>
      <div className='container-titulo-home'> <h2 className='titulo-home'>PI DOGS</h2> 
      </div>
      <div className='img-container2'><img className="img-hero2" src="https://pngimg.com/d/dog_PNG50312.png" alt="" /></div>
      </div>
      
      <div className='container-navbar-home'> <Navbar className="navbar" allUsers={allUsers} setAllUsers={setSortedAllUsers} /> </div>
      <div className='container-cards-home'> <Cards className="cards" allUsers={sortedAllUsers || allUsers} /> </div>
      <footer className='footer-home'></footer>
    </div>
  );
}

export default Home;
