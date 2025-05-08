
import logo from '../logo.svg';
import Header from '../Header';
import {useState} from 'react';
import{Link} from 'react-router-dom';
function App() {

    const [contador, setContador] = useState(0);

    function increment() {
        setContador(contador +1);
    }
    return(
        <div className="App">
         
            <Header title="Header Param" />
            
            <img src={logo} className="App-logo" alt="logo" />
            
            <p>
            <Link to="cadastro">Acessar cadastro </Link> <br></br>
            </p>
            <p><br/>
               <input type="button" value="Clique" onClick={increment} /> 
            </p><br/>
            <p>{contador}</p> cliques!
          
        </div>
    );
}
export default App;