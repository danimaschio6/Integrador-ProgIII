import { UserContext } from '../UserContext/UserContext';
import { useContext,useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, Button  } from 'react-bootstrap';
import './Convocados.css';
import axios from 'axios';
import Swal from 'sweetalert2';

export function Equipo(props) {
    
    const { userData } = useContext(UserContext);
    const {idConvocatoria, rival } = useParams();

    const baseURL = 'http://localhost:3005/api/v1/';

    const [convocados, setConvocados] = useState([]);
    const [titulares, setTitulares] = useState([]);
    const [capitan, setCapitan] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{ 
        buscarConvocados()
    },[]); 
    


    const buscarConvocados = async () => {
        axios.get(baseURL + 'futbolistaConvocatoria/equipo/' + idConvocatoria,{
            headers:{
                Authorization:`Bearer ${userData.token}`
            }
        })
        .then( res => {     
            if(res.data.estado === 'OK'){
            setConvocados(res.data.dato);
            }
        })
        .catch(error =>{
            console.log(error);
        });
    }
  

    // hacer
    const volver = () => {
        navigate('/privado/convocatoria')
    }


    const marcarCapitan = async (idFutbolista) => {
        if (capitan.includes(idFutbolista)) {
            // Si ya está seleccionada, quitarla de la lista de seleccionadas
            setTitulares(titulares.filter((rowId) => rowId !== idFutbolista));
            setCapitan(capitan.filter((rowId) => rowId !== idFutbolista));
            console.log(capitan);
        } else {
            if(capitan.length > 0){
                alert('Un equipo titular no puede tener mas de 1 capitan')
            }else{
                setCapitan([...capitan, idFutbolista])
                setTitulares([...titulares, idFutbolista])
            }
        } 
    }

    const enviarInformacion = () => {    
        
        const lista ={IdConvocatoria:idConvocatoria, futbolistas:capitan}  
        console.log(lista);   
        axios.post(baseURL + 'futbolistaConvocatoria/capitan', lista, {
            headers:{
                Authorization:`Bearer ${userData.token}`
            }
        })
        .then( async res => {           
            console.log(res.data); 
            if(capitan.length > 0){
                if (res.data.estado === 'OK') {
                    const result = await Swal.fire({
                        text: res.data.msj,
                        icon:'success'})

                    if (result.isConfirmed){
                        navigate('/privado/convocatoria');
                    }    
                }
            }
        })
        .catch(error =>{
            // alert("Por favor seleccionar jugadores antes de convocar")
            console.log(error);
        });

    }

    return (
        <>
            <div className='container mt-3 mb-1 mb-5'>
                <div className='row'>
                    <div className="col-md-10">
                        <h1>Equipo vs {rival}</h1>
                    </div>
                    <div className="col-md-2">
                        <Button id="btnConf" variant="primary" onClick={enviarInformacion}>Confirmar</Button>
                        <Button id="btnVolver" variant="primary" onClick={volver}>Volver</Button>
                    </div>
                    
                </div>

                <div className='miTabla'>
                    <Table striped bordered hover>
                        <thead >
                            <tr>
                                {/* <th className='miThead'>id</th> */}
                                <th className='miThead'>Nombre</th>
                                <th className='miThead'>Apellido</th>
                                <th className='miThead'>Posición</th>
                                <th className='miThead'>Capitán</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                convocados ? (convocados.map((item, index) => (
                                    <tr key={index}> 
                                        <td>{item.nombre}</td>
                                        <td>{item.apellido}</td>
                                        <td>{item.posicion}</td>
                                        <td>
                                            <input
                                                type="checkbox" id='checkbox'
                                                checked={capitan.includes(item.idFutbolista)}
                                                onChange={() => {marcarCapitan(item.idFutbolista)} } 
                        
                                            /> 
                        
                                        </td>
                                                                 
                                    </tr>
                                ))) 
                                : <></>
                            }
                        </tbody>
                    </Table> 
                </div>
            </div>
        </>
    );
}

