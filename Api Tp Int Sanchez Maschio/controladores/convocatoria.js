const convocatoriaBD = require('../bases de datos/convocatoriaBD');


buscarTodas = async (req, res) => {
    try{
        const convocatorias = await convocatoriaBD.buscarTodas();
        res.status(200).json({estdo:'OK', dato:convocatorias});
    }catch (exec){
        throw(exec);
    }
}

buscarPorId  = async (req, res) => {

    const idConvocatoria = req.params.idConvocatoria;
    if(!idConvocatoria){
        res.status(404).json({estado:'FALLO', msj:'No se especificó el id de la convocatoria'});
    }else{
        try{
            const convocatoria = await convocatoriaBD.buscarPorId(idConvocatoria);
            res.status(200).json({estado:'OK', dato: convocatoria});
        }catch (exec){
            throw(exec);
        }
    }

}


nueva  = async (req, res) => {

    const {fecha, rival, golesRecibidos, golesConvertidos} = req.body;

    const convocatoria = {
            fecha:fecha,
            rival:rival, 
            golesRecibidos:golesRecibidos, 
            golesConvertidos:golesConvertidos
        }

        try{
            const nuevaConvocatoria = await convocatoriaBD.nueva(convocatoria);
            res.status(201).json({estado:'OK', msj:'Convocatoria creada', dato: nuevaConvocatoria});
        }catch (exec){
            throw exec;
        }

}


const update = async (req, res) => {
    const {fecha,rival}=req.body;
    const idConvocatoria = req.params.idConvocatoria;  

    if(!idConvocatoria) {
                    res.status(404).json({estado:'FALLO', msj:'Falta el id'});
        }

    try {
        const convocatoriaActualizada= await convocatoriaBD.update(idConvocatoria,{fecha,rival});
        res.send({ status: "OK", data: convocatoriaActualizada, msj:'actualizado'});
    } catch (exec) {
        throw exec;
    }
};

modificar = async (req, res) => {
    const {golesConvertidos, golesRecibidos} = req.body;
    const {idConvocatoria} = req.params;

    
    if(!idConvocatoria){
        res.status(404).json({estado:'FALLO', msj:'faltan datos requeridos'});
    }else{
        const dato = {
            golesConvertidos:golesConvertidos, 
            golesRecibidos:golesRecibidos
        }

        const convocatoriaModificada = await convocatoriaBD.modificar(dato, idConvocatoria);
        res.status(200).json({estado:'OK', msj:'Convocatoria modficada', dato:convocatoriaModificada});
    }
}

eliminar = async(req, res) => {
    try{
        const idConvocatoria = req.params.idConvocatoria;   
        
        if(!idConvocatoria) {
            res.status(404).json({estado:'FALLO', msj:'Falta el id'});
        }

        await convocatoriaBD.eliminar(idConvocatoria);

        res.json({estado:'OK', msj:"Se borro con éxito"});

    }catch (exec){
        throw exec;
    }
}




module.exports = {
    buscarTodas,
    buscarPorId,
    nueva,
    modificar,
    eliminar,
    update
}

