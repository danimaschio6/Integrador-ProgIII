// imports de bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { UserContext } from '../UserContext/UserContext';
import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';

// //logo
import Logo from "../img/logo afa.png"




export function Header() {
  const { userData, setUserData } = useContext(UserContext);
    
  const navigate = useNavigate();

  const accion = () => {
    navigate('/login');
  }

  const irInicio = () => {
    setUserData(null);
    navigate('/');        
  };

  return (
    <>
      <Navbar collapseOnSelect expand='lg' bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/"><img src={Logo} style={{width : '25px'}} /></Navbar.Brand>
          <Navbar.Toggle aria-controls='algo'/>
          <Navbar.Collapse id='algo'>
                <Nav className="me-auto">            
                  <Nav.Link as={Link} to='/Institucional'>Institucional</Nav.Link>                
                  <Nav.Link as={Link} to='/contacto'>Contacto</Nav.Link>                  
                </Nav>
                { userData ?(
               
                <Button className='btn btn-primary end-button' onClick={irInicio}>Cerrar Sesion</Button>
                )
                : ( <Button className='btn btn-primary end-button' onClick={accion}>Iniciar Sesión</Button>
             ) }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
 
  );

}



