import { UserContext } from '../UserContext/UserContext';
import { useContext,useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import './Convocatoria.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrash,faUserPen} from "@fortawesome/free-solid-svg-icons"


export function Convocatoria() {
    const baseURL = 'http://localhost:3005';

    const { userData } = useContext(UserContext);

    // para poder navergar entre rutas
    const navigate = useNavigate();

    // datos de convocatoria
    const [convocatorias, setConvocatorias] = useState(null);

    // datos de los rivales disponibles
    const [rivales, setRivales] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    // const [editar,setEditar]= useState(false)

    // objeto para almacenar la informacion de la convocatoria
    const [convocatoria, setConvocatoria] = useState({fecha:'',rival:'', golesRecibidos:'', golesConvertidos:''});

    // const [modal, setModal] = useState ({fecha:'',rival:''})
    
    
    useEffect(()=>{
        buscarConvocatorias();
    },[]); 
    
    const cerrarModal = () => setShowModal(false);
    const cerrarModalEditar = () => setShowModalEditar(false);

    // activa el modal y busca los rivales
    const verModal = () => {
        buscarRivales();
        setShowModal(true);
    };


     // activa el modal y busca los rivales
     const verModalEditar = () => {
        buscarRivales();
        buscarConvocatorias();
        setShowModalEditar(true);
    };


    // me quedo solo con la fecha del datetime
    function formatoFecha(dateTime) {
        const fecha = new Date(dateTime);
        return fecha.toISOString().split('T')[0];
    }

    const buscarRivales = async () =>{
        axios.get(baseURL + '/api/v1/rival/rivales',{
            headers:{
                Authorization:`Bearer ${userData.token}`
            }
        })
            .then( resp => {
                setRivales(resp.data.dato);
            })
            .catch( error => {
                console.log(error);
        });
    }

    const buscarConvocatorias = async () =>{
        axios.get(baseURL + '/api/v1/convocatoria/convocatorias',{
            headers:{
                Authorization:`Bearer ${userData.token}`
            }
        })
            .then( resp => {
                setConvocatorias(resp.data.dato);
            })
            .catch( error => {
                console.log(error);
        })
    }

    const dashboard = () => {        
        navigate('/privado/dashboard');        
    };

    const convocar = (id) => {
        const parametro = id; 
        navigate(`/privado/convocar/${parametro}`);        
    };

    const convocados = (idConvocatoria, rival) => {
        // const idConvocatoria = idConvocatoria; 
        navigate(`/privado/convocados/${idConvocatoria}/${rival}`);        
    };


    const equipo = (idConvocatoria, rival) => {
        // const idConvocatoria = idConvocatoria; 
        navigate(`/privado/equipo/${idConvocatoria}/${rival}`);        
    };

    
    const crearConvocatoria = async(e)=>{
        e.preventDefault();
        // console.log(convocatoria);

        axios.post(baseURL + '/api/v1/convocatoria/nueva', convocatoria,{
            headers:{
                Authorization:`Bearer ${userData.token}`
            }
        })
        .then(res=> {
            if(res.data.estado==='OK'){
                alert(res.data.msj);
                cerrarModal();
                buscarConvocatorias();
            }
        })
        .catch(error=> {
            console.log(error);
        })

    }

    const eliminar = async (idConvocatoria) =>{
        axios.delete(baseURL + '/api/v1/convocatoria/convocatorias/' + idConvocatoria,{
            headers:{
                Authorization:`Bearer ${userData.token}`
            }
        })
        .then( res => {            
            buscarConvocatorias();
        })
        .catch( error => {
            console.log(error);
        })                    
    }


    const editarConvocatoria = async (e) => {
        e.preventDefault();
    
        // Verifica si se ha seleccionado una convocatoria para editar
        if (!convocatoria.idConvocatoria) {
            alert('Debes seleccionar una convocatoria para editar.');
            return;
        }
        console.log(convocatoria)
    
        // Realiza una solicitud PUT para actualizar la convocatoria
        axios.put(`${baseURL}/api/v1/convocatoria/convocatorias/${convocatoria.idConvocatoria}`, convocatoria,{
            headers:{
                Authorization:`Bearer ${userData.token}`
            }
        })
            .then((res) => {
                if (res.data.estado === 'OK') {
                    alert(res.data.msj);
                    cerrarModalEditar();
                    buscarConvocatorias();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const actualizarEditar = (idConvocatoria) => {
        const convocatoriaAEditar = convocatorias.find(item => item.idConvocatoria === idConvocatoria);
        if (convocatoriaAEditar) {
            setConvocatoria({
                idConvocatoria: convocatoriaAEditar.idConvocatoria,
                fecha: convocatoriaAEditar.fecha,
                rival: convocatoriaAEditar.nombre
            });
            verModalEditar(); // Abre el modal de edición
        } else {
            alert('Convocatoria no encontrada.'); // Manejo de error si no se encuentra la convocatoria
        }
    };


    return (
        <>
            <div className='container mt-3 mb-1 mb-5'>
                <div className='row'>
                    <div className="col-md-10">
                        <h1>Convocatorias</h1>
                    </div>
                    <div className="col-md-2">
                        <Button id='btnC' variant="primary" onClick={verModal}>Nueva</Button>
                        <Button id='btnC' variant="info" onClick={dashboard}>Volver</Button>
                    </div>
                </div>
                
                
                <div className='miTabla'>
                    <Table Table hover className="table table-dark">
                        <thead >
                            <tr>
                                <th className='miThead'>Fecha</th>
                                <th className='miThead'>Rival</th>
                                <th className='miThead'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                convocatorias ? (convocatorias.map((item, index) => (
                                    <tr key={item.idConvocatoria}> 
                                        <td>{formatoFecha(item.fecha)}</td>
                                        <td>{item.nombre}</td>
                                        <td>
                                            <Button id='btn2' variant="secondary" className='miBoton' onClick={() => convocar(item.idConvocatoria)}>Convocar</Button>
                                            <Button id='btn2' variant="success" className='miBoton' onClick={() => convocados(item.idConvocatoria, item.nombre)}>Convocados</Button>
                                            <Button id='btn2' variant="success" className='miBoton' onClick={() => equipo(item.idConvocatoria, item.nombre)}>equipo</Button>
                                            <Button id='btn2' variant="danger" onClick={()=>eliminar(item.idConvocatoria)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>                                                                 
                                            <Button id='btn2' onClick={()=>actualizarEditar(item.idConvocatoria)}><FontAwesomeIcon icon={faUserPen}></FontAwesomeIcon></Button>
                                        </td>
                                    </tr>
                                ))) 
                                : <></>
                            }
                        </tbody>
                    </Table> 
                </div>
            </div>

            <Modal show={showModal} onHide={cerrarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva Convocatoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={e => crearConvocatoria(e)}>
                        <div className='row'>
                            <div className="col-md-4">
                                <Form.Group className="mb-3" controlId="formBasicFecha">
                                    <Form.Label>Fecha</Form.Label>
                                    <Form.Control type="date"
                                        onChange={(e) => setConvocatoria({ ...convocatoria, fecha:e.target.value })}
                                        value={convocatoria.fecha} required/>
                                </Form.Group>
                            </div>
                            
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicRival">
                                    <Form.Label>Rival</Form.Label>
                                    <Form.Select onChange={(e) => setConvocatoria({ ...convocatoria, rival:e.target.value })}>
                                        <option value="">Seleccione una opción</option>
                                        { (rivales?.length > 0) ? rivales.map(item => (
                                            <option key={item.idRival} value={item.idRival}>
                                                {item.nombre}
                                            </option>
                                        )) : <></>}                                        
                                    </Form.Select>                                    
                                </Form.Group>
                            </div>
                        </div>
                        <Button variant="primary" type="submit">Guardar</Button>

                        
                    </Form>
                </Modal.Body>
            </Modal>


            <Modal show={showModalEditar} onHide={cerrarModalEditar}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Convocatoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => editarConvocatoria(e)}>
                        <div className='row'>
                            <div className="col-md-4">
                                <Form.Group className="mb-3" controlId="formBasicFecha">
                                    <Form.Label>Fecha</Form.Label>
                                    <Form.Control type="date"
                                        onChange={(e) => setConvocatoria({ ...convocatoria, fecha:e.target.value })}
                                        value={convocatoria.fecha} required/>
                                </Form.Group>
                            </div>
                            
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicRival">
                                    <Form.Label>Rival</Form.Label>
                                    <Form.Select onChange={(e) => setConvocatoria({ ...convocatoria, rival:e.target.value })}>
                                        <option value="">Seleccione una opción</option>
                                        { (rivales?.length > 0) ? rivales.map(item => (
                                            <option key={item.idRival} value={item.idRival}>
                                                {item.nombre}
                                            </option>
                                        )) : <></>}                                        
                                    </Form.Select>                                    
                                </Form.Group>
                            </div>
                        </div>
                        <Button variant="primary" type="submit" onClick={cerrarModalEditar}>Guardar</Button>

                       
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}