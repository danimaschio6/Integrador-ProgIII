import { UserContext } from '../UserContext/UserContext';
import { useContext,useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Table  } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

export function Convocar(props) {
    const { userData } = useContext(UserContext);

    // obtengo mi parametro id convocatoria
    const { parametro } = useParams();

    const baseURL = 'http://localhost:3005/api/v1/';

    const [futbolistas, setFutbolistas] = useState([]);
    
    const [convocados, setConvocados] = useState([]);

    const navigate = useNavigate();

    // buscamos los jugadores activos
    useEffect(()=>{
        buscarFubolistas();
    },[]); 
    
    const buscarFubolistas = async () => {
        axios.get(baseURL + 'futbolista/futbolista', {
        headers:{
            Authorization:`Bearer ${userData.token}`
        }
    })
        .then( res => {           
            setFutbolistas(res.data.dato);
        })
        .catch(error =>{
            console.log(error);
        });
    }

    const convocar = (idFutbolista) => {
        if (convocados.includes(idFutbolista)) {
            // Si ya está seleccionado, quito de la lista de convocados
            setConvocados(convocados.filter((rowId) => rowId !== idFutbolista));
        } else {
            if(convocados.length === 26){
                alert('solo se puede convocar 26 futbolistas')
            }else{
                // Si no está seleccionada, agrego a la lista de convocados
                setConvocados([...convocados, idFutbolista]);
            }                   
        }        
    }

    const enviarInformacion = () => {    
        
        const lista ={ idConvocatoria:parametro, futbolistas:convocados}  
        console.log(lista);   
        axios.post(baseURL + 'futbolistaConvocatoria/nueva', lista, {
            headers:{
                Authorization:`Bearer ${userData.token}`
            }
        })
        .then( async res => {           
            console.log(res.data); 
            if(convocados.length > 0){
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
            alert("Por favor seleccionar jugadores antes de convocar")
            console.log(error);
        });

    }

    const volver = () => {
        navigate('/privado/convocatoria')
    }


    return (
        <>
            <div className='container mt-3 mb-1 mb-5'>
                <div className='row'>
                    <div className="col-md-10">
                        <h1>Convocator Futbolistas</h1>
                    </div>
                    <div className="col-md-2">
                        <Button variant="primary" onClick={enviarInformacion}>Convocar</Button>
                         <Button id="btnVolver" variant="primary" onClick={volver}>Volver</Button>
                    </div>

                </div>

                <div className='miTabla'>
                    <Table striped bordered hover>
                        <thead >
                            <tr>
                                <th className='miThead'>Nombre</th>
                                <th className='miThead'>Apellido</th>
                                <th className='miThead'>Pie Habil</th>
                                <th className='miThead'>Posición</th>
                                <th className='miThead'>Convocar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                futbolistas ? (futbolistas.map((item, index) => (
                                    <tr key={index}> 
                                        <td>{item.nombre}</td>
                                        <td>{item.apellido}</td>
                                        <td>{item.pie}</td>
                                        <td>{item.posicion}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={convocados.includes(item.idFutbolista)}
                                                onChange={() => convocar(item.idFutbolista)}
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