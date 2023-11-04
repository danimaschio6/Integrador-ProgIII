const futbolistaBD = require('../bases de datos/futbolistaBD');

buscarTodos=async(req, res) => {
    try{
        
        const futbolista = await futbolistaBD.buscarTodos();

        res.json({estado:'OK', dato:futbolista});

    }catch (exec){
        throw exec;
    }
}

buscarPorId = async(req, res) => {
    try{
        const idFutbolista = req.params.idFutbolista;   
        
        if(!idFutbolista) {
            res.status(404).json({estado:'FALLO', msj:'Falta el id'});
        }

        const futbolista = await futbolistaBD.buscarPorId(idFutbolista);

        res.json({estado:'OK', dato:futbolista});

    }catch (exec){
        throw exec;
    }
}

eliminar = async(req, res) => {
    try{
        const idFutbolista = req.params.idFutbolista;   
        
        if(!idFutbolista) {
            res.status(404).json({estado:'FALLO', msj:'Falta el id'});
        }

        await futbolistaBD.eliminar(idFutbolista);

        res.json({estado:'OK', msj:"el jugador quedó inactivo"});

    }catch (exec){
        throw exec;
    }
}

crearJugador= async(req, res) => {
    
     const {dni,nombre,apellido,posicion,apodo,pieHabil}=req.body;
    // obtengo el nombre del archivo que manda el cliente
    let filename;
    if(!req.file){
        filename = 'default.jpg'; 
    }else{
        filename = req.file.filename; 
    }

     if(!dni||!nombre||!apellido||!posicion||!pieHabil){
        res.status(404).json({estado:'Falló', msj:"faltan datos obligatorios"});
     }else{
            const futbolista= {
                dni:dni,
                nombre:nombre,
                apellido:apellido,
                posicion:posicion,
                apodo:apodo,
                pieHabil:pieHabil,
                foto:filename
                
            };

            try {
                const futbolistaNuevo=await futbolistaBD.crearJugador(futbolista)
                res.status(200).json({estado:'OK',msj:"se agregó futbolista",dato:futbolistaNuevo});
            } catch (error) {
                console.log(error);
            }
     }
}



const update = async (req, res) => {
    const {dni,nombre,apellido,posicion,apodo,pieHabil}=req.body;
    const idFutbolista = req.params.idFutbolista;
    let filename;
    if(!req.file){
        filename = 'default.jpg'; 
    }else{
        filename = req.file.filename; 
    }  

    if(!idFutbolista) {
                    res.status(404).json({estado:'FALLO', msj:'faltan datos obligatorios'});
    }else{
        try {
            const jugadorActualizado = await futbolistaBD.update(idFutbolista,{dni,nombre,apellido,posicion,apodo,foto:filename,pieHabil});
            res.send({ status: "OK", data: jugadorActualizado, msj:'Jugador actualizado'});
        } catch (exec) {
            throw exec;
        }
    }
};

module.exports = {
    buscarPorId,
    buscarTodos,
    eliminar,
    crearJugador,
    update
}