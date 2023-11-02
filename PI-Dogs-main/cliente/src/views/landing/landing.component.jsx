import { Link } from 'react-router-dom';
import './landing.styles.css';  

function Landing() {
  return (
    <div className="landing-page-container">
    <div className="landing-page-container-title"> <h1 className='titulo-landing'>PI DOGS</h1>
   <Link to="/home"><button className='boton-ingreso'>Ingresar</button></Link>
   </div>
    </div>
  );
}

export default Landing;
