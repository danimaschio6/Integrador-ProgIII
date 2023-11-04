 // envio de correo electrónicos
const nodemailer = require('nodemailer');


exports.enviarCorreo = async (req, res) =>{
    const {nombre, correo, mensaje} = req.body;
    
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.CORREO,
            pass:process.env.CLAVE
        }
    })

    //agregar el mensaje que recibmos en el body 
    const cuerpo = '<h1>Hola llego un correo de ' + nombre + ' </h1>';

    const opciones = {
        from : 'api prog3',
        to:'tpintegradorprog3@gmail.com',
        subject:'titulo',
        html:cuerpo
    }

    transporter.sendMail(opciones, (error, info) => {
        if(error){
            console.log('error -> ', error);
            const respuesta = 'correo no enviado';
            res.json({respuesta});
        }else{
            console.log(info);
            const respuesta = 'correo enviado';
            res.json({respuesta});
        }
    })

}  