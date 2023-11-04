const estadisticaBD = require('../bases de datos/estadisticaBD');

estadistica = async (req, res) => {
    const estadistica = await estadisticaBD.estadistica();    
    res.status(200).json({estado:'OK', dato:estadistica});    
}

module.exports = {
    estadistica
}