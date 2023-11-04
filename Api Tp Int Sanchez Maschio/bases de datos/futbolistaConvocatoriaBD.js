const conexion = require('./conexionBD');

const borrarPorIdConvocatoria = async (cn,idConvocatoria) => {

    const consulta = 'DELETE FROM futbolistaConvocatoria WHERE convocatoria = ?;';
    const [result] = await cn.query(consulta, idConvocatoria);
    
    return result;
}

const borrarPorIdConvocatoriaEquipo = async (cn,idConvocatoria) => {
    const dato= {convocatoria: idConvocatoria}
    const consulta =  `UPDATE futbolistaconvocatoria SET esTitular=0 WHERE ?`;
    const [result] = await cn.query(consulta, dato);
    
    return result;
}


const FutbolistaConvocatoriaPorIdConvocatoria = async (idConvocatoria) => {
    const consulta = `SELECT f.idFutbolista, f.nombre, f.apellido, fc.dorsal, fc.convocatoria,
                        (CASE
                            WHEN posicion = 0 THEN 'arquero'
                            WHEN posicion = 1 THEN 'defensa'
                            WHEN posicion = 2 THEN 'mediocampista'
                            WHEN posicion = 3 THEN 'delantero'
                            
                            ELSE ''
                        END) AS posicion,
                        (CASE
                            WHEN f.pieHabil = 0 THEN 'Derecha'
                            WHEN f.pieHabil = 1 THEN 'Izquierda'
                        END) as pieHabil,
                        (CASE
                            WHEN fc.esTitular = 0 THEN 'No'
                            WHEN fc.esTitular = 1 THEN 'Si'
                        END) as titular,
                        (CASE
                            WHEN fc.esCapitan = 0 THEN 'No'
                            WHEN fc.esCapitan = 1 THEN 'Si'
                        END) as capitan                        
                        FROM futbolista AS f
                        INNER JOIN futbolistaConvocatoria AS fc on fc.futbolista = f.idFutbolista
                        WHERE f.activo = 1 AND fc.convocatoria = ?`;

    const [convocados] = await conexion.query(consulta,idConvocatoria);    

    return convocados;
}


const nueva =  async(idConvocatoria,futbolistas) => {
    const cn = await conexion.getConnection();

    // Función para realizar la transacción de creacion
    try {
        // Inicio la transacción
        await cn.beginTransaction();
 
        // borro la convocatoria anterior
        await borrarPorIdConvocatoria(cn,idConvocatoria);
        
        // por cada futbolista inserto en la bd
        futbolistas.forEach(async element => {
            const dato = {convocatoria:idConvocatoria, futbolista:element}
            const consulta = 'INSERT INTO futbolistaConvocatoria SET ?';
            const [result] = await cn.query(consulta, dato);
        })

        // Realiza el commit para confirmar la transacción
        await cn.commit();
    } catch (error) {
        // En caso de error, realiza un rollback para deshacer las operaciones y manejar el error
        await cn.rollback();
        throw error;
    } finally {
        // Cierra la conexión
        cn.release();
    }
}

const titular =  async(idConvocatoria,futbolistas) => {
    
    const cn = await conexion.getConnection();

    // Función para realizar la transacción de creacion
    try {
        // Inicio la transacción
        await cn.beginTransaction();

        // borro la convocatoria anterior
        await borrarPorIdConvocatoriaEquipo(cn,idConvocatoria);
        
        // por cada futbolista inserto en la bd
        futbolistas.forEach(async element => {           
            const consulta = 'UPDATE futbolistaConvocatoria SET esTitular = 1 WHERE futbolista= ? AND convocatoria= ? ';
            const [result] = await conexion.query(consulta,[element, idConvocatoria]);
        })

        // Realiza el commit para confirmar la transacción
        await cn.commit();
    } catch (error) {
        // En caso de error, realiza un rollback para deshacer las operaciones y manejar el error
        await cn.rollback();
        throw error;
    } finally {
        // Cierra la conexión
        cn.release();
    }
}


const equipo = async (idConvocatoria) => {
    const consulta = `SELECT f.idFutbolista, f.nombre, f.apellido, fc.dorsal, fc.convocatoria,
                        (CASE
                            WHEN posicion = 0 THEN 'arquero'
                            WHEN posicion = 1 THEN 'defensa'
                            WHEN posicion = 2 THEN 'mediocampista'
                            WHEN posicion = 3 THEN 'delantero'
                            
                            ELSE ''
                        END) AS posicion,
                        (CASE
                            WHEN f.pieHabil = 0 THEN 'Derecha'
                            WHEN f.pieHabil = 1 THEN 'Izquierda'
                        END) as pieHabil,
                        (CASE
                            WHEN fc.esTitular = 0 THEN 'No'
                            WHEN fc.esTitular = 1 THEN 'Si'
                        END) as titular,
                        (CASE
                            WHEN fc.esCapitan = 0 THEN 'No'
                            WHEN fc.esCapitan = 1 THEN 'Si'
                        END) as capitan                        
                        FROM futbolista AS f
                        INNER JOIN futbolistaConvocatoria AS fc on fc.futbolista = f.idFutbolista
                        WHERE fc.esTitular = 1 AND fc.convocatoria = ?`;

    const [convocados] = await conexion.query(consulta,idConvocatoria);    

    return convocados;
}

const capitan =  async(idConvocatoria,futbolistas) => {
    
    const cn = await conexion.getConnection();

    // Función para realizar la transacción de creacion
    try {
        // Inicio la transacción
        await cn.beginTransaction();

        
        // por cada futbolista inserto en la bd
        futbolistas.forEach(async element => {           
            const consulta = 'UPDATE futbolistaConvocatoria SET esCapitan = 1 WHERE futbolista= ? AND convocatoria= ? ';
            const [result] = await conexion.query(consulta,[element, idConvocatoria]);
        })

        // Realiza el commit para confirmar la transacción
        await cn.commit();
    } catch (error) {
        // En caso de error, realiza un rollback para deshacer las operaciones y manejar el error
        await cn.rollback();
        throw error;
    } finally {
        // Cierra la conexión
        cn.release();
    }
}
    

module.exports = {
    nueva,
    borrarPorIdConvocatoria,
    borrarPorIdConvocatoriaEquipo,
    FutbolistaConvocatoriaPorIdConvocatoria,
    titular,
    equipo,
    capitan
}
