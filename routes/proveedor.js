'use stricts'

var express = require('express');
var ProveedorController = require('../controllers/proveedor');

var router = express.Router();

//RUTAS PARA EMPLEADO
router.get('/proveedor/list', ProveedorController.listar);
router.get('/proveedor/form/:id', ProveedorController.form); // ABRIENDO EL FORMULARIO PARA EL BOTON NUEVO
router.post('/proveedor/save',ProveedorController.save);
module.exports = router;