import { Link } from 'react-router-dom';
import './landing.styles.css';  

function Landing() {
  return (
    <div className="landing-page">
    <img className= "foto-perro"src="https://upload.wikimedia.org/wikipedia/commons/4/48/Silly_Dog_%282277051513%29.jpg" alt="Imagen Perro" />
    <Link to="/home">Ingresar</Link>
    </div>
  );
}

export default Landing;
