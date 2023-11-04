// framework express
const express = require('express');

var path = require('path');
// envio de correo electrónicos
const nodemailer = require('nodemailer');

// configuracion de passport
const passport = require("passport");
require('./config/passport');

// para gestionar cors
const cors = require('cors');

const mysql = require('mysql2');

// manejo de variables de entorno
require('dotenv').config();

// mi app servidor
const app = express();

const { esEntrenador } = require('./middlewares/esEntrenador');
const { esPresidente } = require('./middlewares/esPresidente');

// para recibir las peticiones del req en formato json
app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.use(cors());

// endpoint de testeo del API
app.get('/', (req, res)=>{
    const saludo = 'bienvenido a prog3';
	res.status(200).json({saludo});
});


// Ruta pública para acceder a los imagenes
app.get('/archivos/:nombreArchivo', (req, res) => {
    const nombreArchivo = req.params.nombreArchivo;
    res.sendFile(path.join(__dirname, 'archivos', nombreArchivo));
});

// las rutas del api
const v1Publico = require('./v1/rutas/publico');
const v1Auth = require('./v1/rutas/auth');
const v1Futbolista = require('./v1/rutas/futbolista');
const v1Rival = require('./v1/rutas/rival');
const v1Convocatoria = require('./v1/rutas/convocatoria');
const v1FutbolistaConvocatoria = require('./v1/rutas/futbolistaConvocatoria');
const v1Estadistica = require('./v1/rutas/estadistica');
// middlEWare
app.use('/api/v1/publico', v1Publico);
app.use('/api/v1/auth', v1Auth);
app.use('/api/v1/futbolista',[passport.authenticate('jwt', {session: false}), esEntrenador], v1Futbolista);
app.use('/api/v1/convocatoria',[passport.authenticate('jwt', {session: false}), esEntrenador], v1Convocatoria);
app.use('/api/v1/rival',[passport.authenticate('jwt', {session: false}), esEntrenador], v1Rival);
app.use('/api/v1/futbolistaConvocatoria',[passport.authenticate('jwt', {session: false}), esEntrenador], v1Rival, v1FutbolistaConvocatoria);
app.use('/api/v1/estadistica',[passport.authenticate('jwt', {session: false}), esPresidente], v1Estadistica);

app.listen(process.env.PUERTO, ()=>{
    console.log("Hola")
    })