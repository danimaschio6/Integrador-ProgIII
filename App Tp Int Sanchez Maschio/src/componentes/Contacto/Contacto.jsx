import { useState } from "react";
import "./Contacto.css"
import axios from "axios";
import { Form, Button, Card} from "react-bootstrap" ;




export function Contacto (){
    const baseURL = 'http://localhost:3005/api/v1/publico/contacto';
    const [formulario, setFormulario] = useState({nombre:'', correo:'', comentario:''});


    const enviarInformacion = async(e)=>{
        e.preventDefault();

        // argumentos: direccion del servidor, datos enviados al servidor
        axios.post(baseURL,formulario)
        .then( res => {
            console.log(res);
            alert(res.data.respuesta);
            setFormulario({nombre:'', correo:'', mensaje:''});
        })
        .catch( error=> {
            console.log('error ', error);
        });
    }   

    return(
        <>
            <div className="container mt-5 d-flex justify-content-center mainContainer">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <Card className="mb-5">
                            <div> 

                            <h1  className="mt-3 mb-3 text-center titulo">ASOCIACIÓN DEL FÚTBOL ARGENTINO</h1>
                            <h3>Sede Social</h3>
                            <ul className="no-bullets">
                                <li>Viamonte 1366/76 (C1053ACB) Bs.As.</li>
                                <li>Teléfonos: 4370-7900 (Líneas rotativas).</li>
                                <li> Sitio Web: <a href="https://www.afa.com.ar">www.afa.org.ar</a> </li>
                                <li>E-Mail: info@afa.org.ar</li>
                            </ul>


            
                            <h3>Predio Julio Humberto Grondona</h3>
                            <p>Autopista Tte. Gral. Ricchieri y E. F. García 
                            (1802) - Ezeiza - Buenos Aires 
                            Teléfonos: 4480-0935/9393</p>
                
            
            
                            <h3> Departamento Selecciones Nacionales</h3>
                            <p>Teléfonos: 4480-0408/9901/9619 
            
                            E-Mail: selecciones@afa.org.ar </p>
                                                                
                            </div>
            
                        </Card>
                    </div>



                    <div className="col-md-6">
                        <Card className="card2">
                            <Card.Body>
                                <Card.Title className="text-center mb-4">Dejanos tu comentario!</Card.Title>
                                
                                <Form onSubmit={e => enviarInformacion(e)}>
                                <Form.Group className="mb-3" controlId="formBasicNombre">
                                    <Form.Label>Nombre y Apellido</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setFormulario({ ...formulario, nombre:e.target.value })} required/>
                                </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicCorreo">
                                        <Form.Label>Correo Electrónico</Form.Label>
                                        <Form.Control type="email" onChange={(e) => setFormulario({ ...formulario, correo: e.target.value})} required/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicMensaje">
                                        <Form.Label>Comentario</Form.Label>
                                        <Form.Control as="textarea" rows={5} onChange={(e) => setFormulario({ ...formulario, comentario: e.target.value})} required/>
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Enviar
                                    </Button>
                                </Form>  
                            </Card.Body>
                        </Card>
                    </div>
                 
                </div>
        
            </div>
            
        </>
    )
}
