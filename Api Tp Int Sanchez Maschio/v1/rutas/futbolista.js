const {Router} = require('express');
const { buscarPorId, buscarTodos, eliminar, crearJugador,update } = require('../../controladores/futbolista');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validarCampos');
const {upload} = require('../../controladores/subirArchivo');
const router = Router();


//agregar
router.post('/futbolista',upload,[
    check('dni','El dni es requerido').not().isEmpty(),
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('apellido','El apellido es requerido').not().isEmpty(),
    check('posicion','La posicion es requerida').not().isEmpty(),
    check('pieHabil','El pie habil es requerido').not().isEmpty(),
    validarCampos
],crearJugador);

//eliminar
router.delete('/futbolista/:idFutbolista',[
    check('idFutbolista','El id es requerido').not().isEmpty(),
    validarCampos
],eliminar);

//actualizar
router.put('/futbolista/:idFutbolista',upload,[
    check('dni','El dni es requerido').not().isEmpty(),
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('apellido','El apellido es requerido').not().isEmpty(),
    check('posicion','La posicion es requerida').not().isEmpty(),
    check('pieHabil','El pie habil es requerido').not().isEmpty(),
    validarCampos
],update);

//buscar
router.get('/futbolista', buscarTodos);

//buscarPorID
router.get('/futbolista/:idFutbolista',[
    check('idFutbolista','El id es requerido').not().isEmpty(),
    validarCampos
],buscarPorId);



module.exports = router;