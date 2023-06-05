'use strict'

//REQUIRES
var express = require('express');

// CARGAR ARCHIVOS DE RUTAS
var empleado_routes = require('./routes/empleado');
var producto_routes = require('./routes/producto');
var proveedor_routes = require('./routes/proveedor');
var cliente_routes = require('./routes/cliente');
var venta_routes = require('./routes/venta');


//EJECUTAR EXPRESS
var app = express();


//ASIGNO  EJS A LAS VISTAS
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

//DECODIFICACION DE ENVIOS FORM
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//REESCRIBIR RUTAS
app.use('/',empleado_routes);//MIGUEL
app.use('/',producto_routes);//FRANK
app.use('/',proveedor_routes);//JOSUE
app.use('/',cliente_routes)//OLIVER 
app.use('/',venta_routes)//ANDRES


//EXPORTAR MODULE
module.exports = app;