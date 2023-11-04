const Router = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validarCampos');
const {buscarPorId, buscarTodas, nueva, modificar, eliminar, update} = require('../../controladores/convocatoria');


const router = Router();


router
    .post('/nueva',[
        check('fecha','La fecha es requerida').not().isEmpty(),
        check('rival','El rival es requerido').not().isEmpty(),
        validarCampos
    ], nueva)

    
    .get('/convocatorias', buscarTodas)

    .get('/convocatorias/:idConvocatoria',[
        check('idConvocatoria','El id es requerido').not().isEmpty(),
        validarCampos
    ], buscarPorId)

    .delete('/convocatorias/:idConvocatoria',[
        check('idConvocatoria','El id es requerido').not().isEmpty(),
        validarCampos
    ],eliminar)

    .put('/convocatorias/:idConvocatoria',[
        check('fecha','La fecha es requerida').not().isEmpty(),
        check('rival','El rival es requerido').not().isEmpty(),
        validarCampos
    ], update);

module.exports = router;