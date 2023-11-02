import {Route,Routes} from "react-router-dom";
import Home from './views/home/home.component';
import Detail from './views/detail/detail.component';
import Create from './views/create/create.component';
import Landing from './views/landing/landing.component';


function App() {
  return (
    
    <div >
    <Routes>
    <Route path= "/" Component={Landing}/>
    <Route exact path= "/home" Component={Home}/>
    <Route path= "/home/:id" Component={Detail}/>
    <Route path= "/create" Component={Create}/>
    </Routes>
    </div>
    
  );
}

export default App;
