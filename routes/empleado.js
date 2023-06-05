'use stricts'

var express = require('express');
var EmpleadoController = require('../controllers/empleado');

var router = express.Router();

//RUTAS PARA EMPLEADO
router.get('/', EmpleadoController.listar);
router.get('/empleado/list', EmpleadoController.listar);
router.get('/empleado/form/:id', EmpleadoController.form); // ABRIENDO EL FORMULARIO PARA EL BOTON NUEVO
router.post('/empleado/save',EmpleadoController.save);
module.exports = router;