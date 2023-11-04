import { UserContext } from '../UserContext/UserContext';
import { useContext,useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, Button  } from 'react-bootstrap';
import './Convocados.css';
import axios from 'axios';
import Swal from 'sweetalert2';

export function Convocados(props) {
    const { userData } = useContext(UserContext);
    const {idConvocatoria, rival} = useParams();

    const baseURL = 'http://localhost:3005/api/v1/';

    const [convocados, setConvocados] = useState([]);
    const [titulares, setTitulares] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        buscarConvocados()
    },[]); 
    

    const buscarConvocados = async () => {
        axios.get(baseURL + 'futbolistaConvocatoria/futbolistaConvocatoria/' + idConvocatoria,{
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

    const [positions, setPosition] = useState([]);

    
    const titularizar = async (idFutbolista) => {
        if (titulares.includes(idFutbolista)) {
            // Si ya está seleccionada, quitarla de la lista de seleccionadas
            setTitulares(titulares.filter((rowId) => rowId !== idFutbolista));
        } else {
            try {
                if(titulares.length < 11 ){
                    let position = convocados.findIndex(index => index.idFutbolista== idFutbolista)
                    positions.push(convocados[position].posicion)
                    var indices= []
                    var element= "arquero"
                    var index=positions.indexOf(element)                 
                    while (index !=-1) {
                        indices.push(index)
                        index=positions.indexOf(element, index + 1)                                              
                      }
                 console.log(indices);
                    
                }
                else {
                    throw "Un equipo titular solo tiene 11 jugadores";
                    }   
                if (indices.length < 2) {
                    setTitulares([...titulares, idFutbolista])  
                }          
                else {
                    positions.pop()
                    throw "Un equipo titular solo tiene 1 arquero";
                    
                    }  
            } catch (error) {
                alert("Error: " + error)
            }
        } 
    }

     
    
  
    const volver = () => {
        navigate('/privado/convocatoria')
    }


    const enviarInformacion = () => {    
        
        const lista ={IdConvocatoria:idConvocatoria, futbolistas:titulares}  
        console.log(lista);   
        axios.post(baseURL + 'futbolistaConvocatoria/titular', lista, {
            headers:{
                Authorization:`Bearer ${userData.token}`
            }
        })
        .then( async res => {           
            console.log(res.data); 
            if(titulares.length > 0){
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
            console.log(error);
        });

    }

 

    return (
        <>
            <div className='container mt-3 mb-1 mb-5'>
                <div className='row'>
                    <div className="col-md-10">
                        <h1>Convocados vs {rival}</h1>
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
                                <th className='miThead'>Pie Habil</th>
                                <th className='miThead'>Posición</th>
                                <th className='miThead'>Titular ({titulares.length})</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                convocados ? (convocados.map((item, index) => (
                                    <tr key={index}> 
                                        <td>{item.nombre}</td>
                                        <td>{item.apellido}</td>
                                        <td>{item.pieHabil}</td>
                                        <td>{item.posicion}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={titulares.includes(item.idFutbolista)}
                                                onChange={() => titularizar(item.idFutbolista)}
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