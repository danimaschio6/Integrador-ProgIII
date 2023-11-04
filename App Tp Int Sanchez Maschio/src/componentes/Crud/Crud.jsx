import { UserContext } from '../UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import { useContext,useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

import { Button, Table, Form, Card } from 'react-bootstrap';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrash, faUserPen} from "@fortawesome/free-solid-svg-icons"



import './Crud.css' ;


export function Crud() {
    const baseURL = 'http://localhost:3005/api/v1/';

    const { userData } = useContext(UserContext);

    const navigate = useNavigate();

    const [formulario, setFormulario] = 
    useState({dni:'',nombre:'', apellido:'', posicion:'', apodo:'', pieHabil:''});

   
    const [archivo, setArchivo] = useState(null);

    const changeArchivo = (e) => {        
        setArchivo(e.target.files[0]);
    };


    // datos de futbolista
    const [datos, setDatos] = useState(null);
    
    useEffect(()=>{
        buscarJugadores();
    },[]); 

    const buscarJugadores = async () =>{
        axios.get(baseURL + 'futbolista/futbolista', {
            headers:{
                Authorization:`Bearer ${userData.token}`
            }
        })
        .then (res => {
            // console.log(res);
            setDatos(res.data.dato);
        })
        .catch(error => {
            console.log(error);
        });             
    }

    const eliminar = async (idFutbolista) =>{
        axios.delete(baseURL + 'futbolista/futbolista/' + idFutbolista, {
            headers:{
                Authorization:`Bearer ${userData.token}`
            }
        })
        .then( res => {            
            buscarJugadores();
        })
        .catch( error => {
            console.log(error);
        })                    
    }

    const enviarInformacion = async(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('dni', formulario.dni);
        formData.append('nombre', formulario.nombre);
        formData.append('apellido', formulario.apellido);
        formData.append('posicion', formulario.posicion);
        formData.append('apodo', formulario.apodo);
        formData.append('pieHabil', formulario.pieHabil);
        formData.append('foto', archivo);
        // try {

        axios.post(baseURL + 'futbolista/futbolista', formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
            }
        })
        .then(res => {
            if(res.data.estado === 'OK'){
                alert(res.data.msj);
                buscarJugadores();
                setFormulario({dni:'',nombre:'', apellido:'', posicion:'', apodo:'', pieHabil:''});
        }  
        })
        .catch(error => {
            console.log(error)

        })
    }


    const limpiarFormulario =()=>{
        setFormulario({dni:'',nombre:'', apellido:'', posicion:'', apodo:'', foto:'', pieHabil:''});
        setEditar(false)
    }


    const [editar,setEditar]= useState("")
   
    const actualizar =(val) =>{
        setEditar(true);
        setFormulario({dni:val.dni,nombre:val.nombre, apellido:val.apellido, posicion:val.posicion, apodo:val.apodo, foto:val.foto, pieHabil:val.pieHabil});               
    }

    const update=(idFutbolista)=>{

        const formData = new FormData();
        formData.append('dni', formulario.dni);
        formData.append('nombre', formulario.nombre);
        formData.append('apellido', formulario.apellido);
        formData.append('posicion', formulario.posicion);
        formData.append('apodo', formulario.apodo);
        formData.append('pieHabil', formulario.pieHabil);
        formData.append('foto', archivo);
        setEditar(false);
        axios.put(baseURL +'futbolista/futbolista/' + idFutbolista,formData, {
            headers:{
            'Content-Type': 'multipart/form-data',
            Authorization:`Bearer ${userData.token}`
        }
        })
        .then( res => {
            buscarJugadores();
            limpiarFormulario();
            console.log(archivo)
            console.log(formData)
        })
        .catch( error => {
            alert('faltan datos obligatorios')
            limpiarFormulario();
            console.log(error);
        })   
    }


    const dashboard = () => {        
        navigate('/privado/dashboard');        
    }
    
    return (
        <>
            <div className='container mt-4 mb-2'>
                    <div className="col-md-1">
                        <Button id="btnC" variant="info" onClick={dashboard}>Volver</Button>
                    </div>
                <Card className='mt-3 mb-3'>
                    <Card.Body>
                        <Form onSubmit={e => enviarInformacion(e)}>
                            <div className='row'>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicdni">
                                        <Form.Label>DNI</Form.Label>
                                        <Form.Control type="text"
                                            onChange={(e) => setFormulario({ ...formulario, dni:e.target.value })}
                                            value={formulario.dni} required/>
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicNombre">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="text"
                                            onChange={(e) => setFormulario({ ...formulario, nombre:e.target.value })}
                                            value={formulario.nombre} required/>
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicApellido">
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control type="text"
                                            onChange={(e) => setFormulario({ ...formulario, apellido:e.target.value })}
                                            value={formulario.apellido} required/>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicPosición">
                                        <Form.Label>Posición</Form.Label>
                                        <Form.Select onChange={(e) => setFormulario({ ...formulario, posicion:e.target.value })}>
                                            <option value=''>Seleccione una opción</option>
                                            <option value="0">Arquero</option>
                                            <option value="1">Defensa</option>
                                            <option value="2">Mediocampista</option>
                                            <option value="3">Delantero</option>
                                        </Form.Select>                                    
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicApodo">
                                        <Form.Label>Apodo</Form.Label>
                                        <Form.Control type="text"
                                            onChange={(e) => setFormulario({ ...formulario, apodo:e.target.value })}
                                            value={formulario.apodo}/>
                                    </Form.Group>
                                    
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicFoto">
                                        <Form.Label>Foto</Form.Label>
                                        <Form.Control type="file"
                                            accept=".jpg, .jpeg, .png" // Define los tipos de archivo permitidos                                        
                                            onChange={changeArchivo}/>
                                    </Form.Group>
                                    
                                </div>
                                    <div className="col-md-4">
                                        <Form.Group className="mb-3" controlId="formBasicPieHabil">
                                            <Form.Label>Pie Habil</Form.Label>
                                            <Form.Select onChange={(e) => setFormulario({ ...formulario, pieHabil:e.target.value })}>
                                                <option value="">Seleccione una opción</option>
                                                <option value="0">Derecho</option>
                                                <option value="1">Zurdo</option>
                                            </Form.Select>                                    
                                        </Form.Group>
                                    </div>
                            </div>
                            {
                            editar==true?
                            <div> 
                            {/* <Button className='btn btn-info m-2' onClick={()=>update()}> actualizar</Button> <Button className='btn btn-warning m-2' onClick={()=>limpiarFormulario()}> cancelar</Button> */}
                            {<Button id='btn' onClick={()=>limpiarFormulario()}> cancelar</Button>}
                            </div>
                            : <Button id='btn3' variant="primary" type="submit">  Crear</Button>
                            }
                           
                              
                        </Form>  
                    </Card.Body>
                </Card>
            </div>
            

            <div className='container mt-1 mb-5 miTabla'>
                <Table hover className="table table-dark">
                    <thead >
                        <tr>
                            <th className='miThead'>#</th>
                            <th className='miThead'>DNI</th>
                            <th className='miThead'>Apellido</th>
                            <th className='miThead'>Nombre</th>
                            <th className='miThead'>Posicion</th>
                            <th className='miThead'>Apodo</th>
                            <th className='miThead'>Foto</th>
                            <th className='miThead'>Pie Habil</th>
                            <th className='miThead'>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datos ? (datos.map((item, index) => (
                                <tr key={index}> 
                                    <td>{item.idFutbolista}</td>
                                    <td>{item.dni}</td>
                                    <td>{item.apellido}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.posicion}</td>
                                    <td>{item.apodo}</td>
                                    <td>
                                        <img 
                                            className='foto'
                                            src={`http://localhost:3005/archivos/${item.foto}`} alt={item.foto}
                                        />
                                    </td>
                                    <td>{item.pie}</td>
                                    <td>
                                        {
                                        editar==true?
                                            <Button id='btn' onClick={()=>update(item.idFutbolista)}>actualizar</Button>
                                        :   <Button id='btn2' onClick={()=>actualizar(item)}><FontAwesomeIcon icon={faUserPen}></FontAwesomeIcon></Button>
                                        }
                                        <Button id='btn2' variant="danger" onClick={()=>eliminar(item.idFutbolista)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                                    </td>
                                </tr>
                            ))) 
                            : 
                            (
                                <tr>
                                    <td>error</td>
                                    <td>error</td>
                                    <td>error</td>
                                    <td>error</td>
                                    <td>error</td>
                                    <td>error</td>
                                    <td>error</td>
                                    <td>error</td>
                                    <td>error</td>           
                                </tr>
                            )
                        }
                    </tbody>
                </Table> 
            </div>
        </>
    );
}