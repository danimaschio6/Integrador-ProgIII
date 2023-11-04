const {Router} = require('express');

const { buscarPorId, buscarTodos} = require('../../controladores/rival');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validarCampos');

const router = Router();


router
    .get('/rivales', buscarTodos)


    .get('/rivales/:idRival',[
        check('idRival','El id es requerido').not().isEmpty(),
        validarCampos
    ], buscarPorId);



module.exports = router;
