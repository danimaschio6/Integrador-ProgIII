const conexion = require('./conexionBD');

const buscarPorId = async (idFutbolista) => {

     const consulta = `SELECT  idFutbolista,dni, nombre, apellido,
    (CASE
        WHEN posicion = 0 THEN 'arquero'
        WHEN posicion = 1 THEN 'defensa'
        WHEN posicion = 2 THEN 'mediocampista'
        WHEN posicion = 3 THEN 'delantero'
        
        ELSE ''
    END) AS posicion,
    apodo,foto,
    (CASE
        WHEN pieHabil = 0 THEN 'derecho'
        WHEN pieHabil = 1 THEN 'zurdo'  
        ELSE ''
    END) AS pie  
    FROM futbolista 
    WHERE activo = 1 AND idFutbolista = ?`;

    const [futbolista] = await conexion.query(consulta,idFutbolista);    

    return futbolista;
}

const buscarTodos = async () => {


    const consulta = `SELECT idFutbolista, dni, nombre, apellido,
    (CASE
        WHEN posicion = 0 THEN 'arquero'
        WHEN posicion = 1 THEN 'defensa'
        WHEN posicion = 2 THEN 'mediocampista'
        WHEN posicion = 3 THEN 'delantero'
        
        ELSE ''
    END) AS posicion,
    apodo,foto,
    (CASE
        WHEN pieHabil = 0 THEN 'derecho'
        WHEN pieHabil = 1 THEN 'zurdo'  
        ELSE ''
    END) AS pie  
    FROM futbolista 
    WHERE activo = 1`;


    const [futbolista] = await conexion.query(consulta);    

    return futbolista;
}

const eliminar = async (idFutbolista) => {

    const consulta = `UPDATE futbolista SET activo = 0 WHERE idFutbolista=?`;

    const [futbolista] = await conexion.query(consulta,idFutbolista);    

    return futbolista;
}

const crearJugador = async (futbolista) => {


    const consulta = `INSERT INTO futbolista SET ?`;

    const [futbolistaNuevo] = await conexion.query(consulta,futbolista);
  
    const jugador = futbolistaNuevo.insertId
    return buscarPorId(jugador);
}

const update = async (idFutbolista, {dni,nombre,apellido,posicion,apodo,foto,pieHabil}) => {

    const consulta= "UPDATE `futbolista` SET dni=?,nombre=?,apellido=?,posicion=?,apodo=?,foto=?,pieHabil=? WHERE idFutbolista=?"

    await conexion.query(consulta, [dni,nombre,apellido,posicion,apodo,foto,pieHabil, idFutbolista]);

    return buscarPorId(idFutbolista);
};




module.exports = {
    buscarPorId,
    buscarTodos,
    eliminar,
    crearJugador,
    update
}
