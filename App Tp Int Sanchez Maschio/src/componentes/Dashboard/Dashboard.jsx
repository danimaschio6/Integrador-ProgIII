import { useNavigate } from 'react-router-dom';
import { useContext,useEffect,useState } from 'react';
import { UserContext } from '../UserContext/UserContext';
import { ProtectedElement } from '../ProtectedElement/ProtectedElement';
import './Dashboard.css';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import axios from 'axios';


const Dashboard = () => {
    const baseURL = 'http://localhost:3005/api/v1/';
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext);
    const [proxConvocatoria, setProxConvocatoria] = useState(Date);
    const [jugadoresActivos, setJugadoresActivos] = useState("");
    const [cantConv, setCantConv] = useState("");
    const [totalConvJug, setTotalConvJug] = useState("");
    const [cantFutb, setcantFutb] = useState("");
    const [jugadoresInactivo, setJugadoresInactivo] = useState("");

    useEffect(()=>{
        buscarEstadisticas();
    },[]); 

    function formatoFecha(dateTime) {
        const fecha = new Date(dateTime);
        return fecha.toISOString().split('T')[0];
    }

    const irAConvocatoria = () => {
        navigate(`/privado/convocatoria`);        
    };

    const irAFutbolista = () => {
        navigate(`/privado/crud`);        
    };

    const buscarEstadisticas = async () =>{
        axios.get(baseURL + 'estadistica/estadistica',{
            headers:{
                Authorization:`Bearer ${userData.token}`
            }
        })
        .then (res => {
            setProxConvocatoria(res.data.dato.convocatorias);
            setJugadoresActivos(res.data.dato.futbolistasActivos);
            setCantConv(res.data.dato.cantConvocatoria);
            setTotalConvJug(res.data.dato.totalConvocatoria);
            setcantFutb(res.data.dato.cantFutbolista);
            setJugadoresInactivo(res.data.dato.futbolistaInactivo);
        })
        .catch(error => {
            console.log(error);
        });             
    }


    return (userData.user ?
        <>
       
      
        <div className='container mt-3 mb-1 mb-5'>
            <h1>Bienvenido {userData.user.nombre}!</h1>
            
            <ProtectedElement mustBeEntrenador={true}>
                <div className='row'>
                    <div className="col-md-10">
                        <h4>Convocatorias</h4>
                    </div>
                    <div className="col-md-2">
                        <Button variant="primary" onClick={irAConvocatoria}>Ver</Button>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-10">
                        <h4>Futbolistas</h4>
                    </div>
                    <div className="col-md-2">
                        <Button variant="primary" onClick={irAFutbolista}>Ver</Button>
                    </div>
                </div>
            </ProtectedElement>
            <ProtectedElement mustBePresidente={true}>
                <div className='row'>
                    <div id='dash' className= 'container mt-3 mb-1 mb-5'>
                        <div className="col-md-12">                  
                            <div className='row'>
                            <div>
                                    <h2>Datos acerca de los futbolistas</h2>
                                </div>
                                <Col sm={6} md={4} lg={3}>
                                    <Card id='card'>
                                        <Card.Body>
                                            <Card.Title id='titulo'>Jugadores</Card.Title>
                                            <Card.Subtitle>Total</Card.Subtitle>
                                            <Card.Text><h3>{cantFutb}</h3></Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col sm={6} md={4} lg={3}>
                                    <Card id='card'>
                                        <Card.Body>
                                            <Card.Title id='titulo'>Jugadores</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Activos</Card.Subtitle>
                                            <Card.Text><h3>{jugadoresActivos}</h3></Card.Text>                                    
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col sm={6} md={4} lg={3}>
                                    <Card  id='card'>
                                        <Card.Body>
                                            <Card.Title id='titulo'>Jugadores</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Inactivos</Card.Subtitle>
                                            <Card.Text><h3>{jugadoresInactivo}</h3></Card.Text>                                    
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <div>
                                    <h2>Datos acerca de las convocatorias</h2>
                                </div>

                                <Col sm={6} md={4} lg={3}>
                                    <Card  id='card'>
                                    <Card.Body>
                                            <Card.Title id='titulo'>Proxima Convocatoria</Card.Title>                                       
                                            <Card.Text><h3>{formatoFecha(proxConvocatoria)}</h3></Card.Text>                                            
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col sm={6} md={4} lg={3}>
                                    <Card  id='card'>
                                    <Card.Body>
                                            <Card.Title id='titulo'>Convocatorias</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Que quedan</Card.Subtitle>
                                            <Card.Text><h3>{cantConv}</h3></Card.Text>                                    
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col sm={6} md={4} lg={3}>
                                    <Card  id='card'>
                                        <Card.Body>
                                            <Card.Title id='titulo'>Convocatorias</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Jugadas</Card.Subtitle>
                                            <Card.Text><h3>{totalConvJug}</h3></Card.Text>                                    
                                        </Card.Body>
                                    </Card>
                                </Col>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </ProtectedElement>
        </div>
    </> : <></>  
    )
};

export { Dashboard };