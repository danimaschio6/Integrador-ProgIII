const Router = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validarCampos');
const {nueva, FutbolistaConvocatoriaPorIdConvocatoria, titular, equipo,capitan} = require('../../controladores/futbolistaConvocatoria');



const router = Router();


router

    .post('/nueva',[
        check('idConvocatoria','el id es requerido').not().isEmpty(),
        check('futbolistas','tienes que convocar para continuar').not().isEmpty(),
        validarCampos
    ], nueva)


    .post('/titular',[
        check('IdConvocatoria','el id es requerido').not().isEmpty(),
        check('futbolistas','tienes que convocar para continuar').not().isEmpty(),
        validarCampos
    ], titular)



    .get('/futbolistaConvocatoria/:idConvocatoria',[
        check('idConvocatoria','el id es requerido').not().isEmpty(),
        validarCampos
    ], FutbolistaConvocatoriaPorIdConvocatoria)

    .get('/equipo/:idConvocatoria',[
        check('idConvocatoria','el id es requerido').not().isEmpty(),
        validarCampos
    ], equipo)

    .post('/capitan',[
        check('IdConvocatoria','el id es requerido').not().isEmpty(),
        check('futbolistas','tienes que convocar para continuar').not().isEmpty(),
        validarCampos
    ], capitan)


module.exports = router;