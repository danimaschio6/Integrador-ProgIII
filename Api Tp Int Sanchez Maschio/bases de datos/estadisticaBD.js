const conexion = require('./conexionBD');

const estadistica = async () => {
    // este procedimiento almacenado retorna 2 valores de forma separada la proxima clase lo mejoramos
    const consulta = 'call procEstadistica()';
    
    const [results] = await conexion.query(consulta);    
    
    console.log(results);
    const convocatorias = results[0][0].proximaConvocatoria;
    const futbolistas = results[0][0].futbolistasActivos;
    const total = results[0][0].totalConvocatoria;
    const cantidadConvocatorias = results[0][0].cantConvocatoria;
    const totalFutbolista = results[0][0].cantFutbolista;
    const totalFutbolistaI = results[0][0].futbolistaInactivo;
   

  
 

    const datos = {
        futbolistasActivos : futbolistas,
        convocatorias : convocatorias,
        totalConvocatoria: total,
        cantConvocatoria: cantidadConvocatorias,
        cantFutbolista: totalFutbolista,
        futbolistaInactivo: totalFutbolistaI
        
    }
    return datos;
}


module.exports = {
    estadistica
}
