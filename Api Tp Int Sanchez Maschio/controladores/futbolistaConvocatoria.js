const futbolistasConvocatoriaBD = require('../bases de datos/futbolistaConvocatoriaBD');


nueva  = async (req, res) => {
    const {idConvocatoria, futbolistas} = req.body;
    try{
        const nuevaLista = await futbolistasConvocatoriaBD.nueva(idConvocatoria,futbolistas);
        res.status(201).json({estado:'OK', msj:'Convocatoria Realizada!'});
    }catch (exec){
        throw exec;
    }
}

titular  = async (req, res) => {
    const {IdConvocatoria, futbolistas} = req.body;
    try{
        const nuevaLista = await futbolistasConvocatoriaBD.titular(IdConvocatoria,futbolistas);
        res.status(201).json({estado:'OK', msj:'equipo titular'});
    }catch (exec){
        throw exec;
    }
}

capitan = async (req, res) => {
    const {IdConvocatoria, futbolistas} = req.body;
    try{
        const nuevaLista = await futbolistasConvocatoriaBD.capitan(IdConvocatoria,futbolistas);
        res.status(201).json({estado:'OK', msj:'Capitan seleccionado'});
    }catch (exec){
        throw exec;
    }
}



FutbolistaConvocatoriaPorIdConvocatoria = async (req, res) => {
    const {idConvocatoria} = req.params;

    try{
        const convocados = await futbolistasConvocatoriaBD.FutbolistaConvocatoriaPorIdConvocatoria(idConvocatoria);
        res.status(201).json({estado:'OK', dato:convocados});
    }catch (exec){
        throw exec;
    }

}

equipo = async (req, res) => {
    const {idConvocatoria} = req.params;

    try{
        const convocados = await futbolistasConvocatoriaBD.equipo(idConvocatoria);
        res.status(201).json({estado:'OK', dato:convocados});
    }catch (exec){
        throw exec;
    }

}

module.exports = {
    nueva,
    FutbolistaConvocatoriaPorIdConvocatoria,
    titular,
    equipo,
    capitan
}

