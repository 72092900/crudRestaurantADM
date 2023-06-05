'use stricts'

var express = require('express');
var VentaController = require('../controllers/venta');

var router = express.Router();

//RUTAS PARA EMPLEADO
router.get('/', VentaController.listar);
router.get('/venta/list', VentaController.listar);
router.get('/venta/form/:id', VentaController.form); // ABRIENDO EL FORMULARIO PARA EL BOTON NUEVO
router.post('/venta/save',VentaController.save);
module.exports = router;