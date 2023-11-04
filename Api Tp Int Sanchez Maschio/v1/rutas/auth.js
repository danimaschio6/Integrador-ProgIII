const {Router} = require('express');

const {login  } = require('../../controladores/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validarCampos');

const router = Router();

router.post('/login' ,[
    check('correoElectronico','El correo es requerido').isEmail(),
    check('clave','El nombre es requerido').not().isEmpty(),
    validarCampos
], login);


module.exports = router;
