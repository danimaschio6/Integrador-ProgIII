const { Router } = require('express');
const { enviarCorreo } = require('../../controladores/publico');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validarCampos');

const router = Router();

router.post('/contacto', [
    check('correo','El correo es requerido').isEmail(),
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('mensaje','El mensaje es requerido').not().isEmpty(),
    validarCampos
], enviarCorreo);

module.exports = router;