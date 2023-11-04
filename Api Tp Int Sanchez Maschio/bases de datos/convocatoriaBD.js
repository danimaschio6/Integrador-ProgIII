const conexion = require('./conexionBD');

const buscarPorId = async (idConvocatoria) => {

    const consulta = `SELECT * FROM convocatoria as c
                        INNER JOIN rival AS r ON r.idRival = c.rival
                        WHERE c.idConvocatoria = ?`;

    const [convocatoria] = await conexion.query(consulta,idConvocatoria);    

    return convocatoria;
}


const buscarTodas = async () => {

    const consulta = `SELECT * FROM convocatoria as c INNER JOIN rival AS r ON r.idRival = c.rival`;

    const [convocatorias] = await conexion.query(consulta);    

    return convocatorias;
}

const nueva = async (convocatoria) => {

    const consulta = 'INSERT INTO convocatoria SET ?';
    const [convocatoriaNueva] = await conexion.query(consulta, convocatoria);

    return buscarPorId(convocatoriaNueva.insertId);
}

const update = async (idConvocatoria, {fecha,rival}) => {
    const consulta= "UPDATE convocatoria SET fecha= ?, rival=? WHERE idConvocatoria=?"
    await conexion.query(consulta, [fecha,rival,idConvocatoria]);

    return buscarPorId(idConvocatoria);
};

const modificar = async (dato, idConvocatoria) => {
    const consulta = 'UPDATE convocatoria SET ? WHERE idConvocatoria = ?';
    
    const [result] = await conexion.query(consulta,[dato, idConvocatoria]);
    
    return buscarPorId(idConvocatoria)
}

const eliminar = async (idConvocatoria) => {

    const consulta = 'DELETE futbolistaConvocatoria FROM futbolistaConvocatoria JOIN convocatoria ON futbolistaConvocatoria.convocatoria=convocatoria.idConvocatoria WHERE convocatoria.idConvocatoria= ?';
    const borrado = 'DELETE FROM convocatoria WHERE idConvocatoria = ?'
    const [convocatoria] = await conexion.query(consulta,idConvocatoria);    
    const [actulizada] = await conexion.query(borrado,idConvocatoria);
    return convocatoria,actulizada;
}

module.exports = {
    buscarPorId,
    buscarTodas,
    nueva, 
    modificar,
    eliminar,
    update
}
