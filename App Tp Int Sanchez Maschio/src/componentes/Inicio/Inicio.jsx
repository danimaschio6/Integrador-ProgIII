import './Inicio.css' ;
import { Card, Button  } from 'react-bootstrap';
import { Link } from 'react-router-dom';



//hook de react
import { useEffect, useState } from "react";


// clase de bootstrap
import { Alert } from "react-bootstrap";

export function Inicio(){

    const [datos, setDatos] = useState(null);

    useEffect(()=>{
        const tema = "futbol argentino "
        const apiKey = 'a9284d1e9cde4b6bbdd63ae84dc3489b';
        const consulta = `https://newsapi.org/v2/everything?q=${tema}&sortBy=publishedAt&pageSize=15&language=es&apiKey=${apiKey}`;

        fetch(consulta)
        .then( resp => {
            resp.json().then(data => {
                // console.log(data);
                setDatos(data.articles);
            } )
        })
        .catch(error => {
            console.log('error -->', error);
        });

    }, []);

    return(
        <>
            <div className='seccionNoticias'>
                <h1>Sección Noticias</h1>
            </div>
            <div className="d-flex flex-wrap align-items-center justify-content-center">
                {
                    datos ? (datos.map((item, index) => (
                        <div key = {index} className='tarj' >
                            <Card key={index} className='tarj2'>
                                <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.description}</Card.Text>
                                <Card.Footer >
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <Button variant="primary" className="enlace-boton">
                                    <Link to={item.url} target="_blank" className="enlace-interior">Ir al enlace</Link>
                                </Button>          
                                </a>
                                </Card.Footer>
                                </Card.Body>
                            </Card>
                        </div>
                    ))) 
                    : 
                    (
                        <div className="container mt-5">
                            <Alert>buscando info.</Alert>
                        </div>
                    )
                }
            </div>
        </>
    )
}