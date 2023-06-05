'use stricts'

var express = require('express');
var ClienteController = require('../controllers/cliente');

var router = express.Router();

//RUTAS PARA EMPLEADO
router.get('/cliente/list', ClienteController.listar);
router.get('/cliente/form/:id', ClienteController.form); // ABRIENDO EL FORMULARIO PARA EL BOTON NUEVO
router.post('/cliente/save',ClienteController.save);
module.exports = router;