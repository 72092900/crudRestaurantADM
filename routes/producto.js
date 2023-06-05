'use stricts'

var express = require('express');
var ProductoController = require('../controllers/producto');

var router = express.Router();

//RUTAS PARA EMPLEADO
router.get('/producto/list', ProductoController.listar);
router.get('/producto/form/:id', ProductoController.form); // ABRIENDO EL FORMULARIO PARA EL BOTON NUEVO
router.post('/producto/save',ProductoController.save);
module.exports = router;