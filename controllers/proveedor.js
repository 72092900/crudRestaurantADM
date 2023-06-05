'use strict'

var client = require("../database/db");
var db = client.db("empleadosdb"); // SELECCIONANDO LA BASE DE DATOS

var controller = {
    listar: function (req, res) {
        console.log("-----------------------");
        console.log("ENTRANDO A LA FUNCION LISTAR");
        db.collection("proveedores").find().toArray().then(
            proveedores => {
                res.render('proveedor_list', { dataProveedores: proveedores });
            }
        ).catch(
            error => console.error()
        );
    },
    form: function (req, res) { // FUNCION FORM PARA ABRIR EL FORMULARIO
        console.log("---------------");
        console.log("ENTRANDO A LA FUNCION FORM");
        console.log("id:"+req.params.id);
        if(req.params.id == 0){
            var proveedor = {}
            proveedor.idProveedor = 0;
            proveedor.proveedor = "";
            proveedor.producto = "";
            proveedor.telefono = "";
            proveedor.correo = "";
            res.render('proveedor_form', { proveedorForm: proveedor });
        }else{
            db.collection("proveedores").find({idProveedor: parseInt(req.params.id)}).toArray().then(
                proveedorEncontrado => {
                    console.log(proveedorEncontrado[0] );
                    res.render('proveedor_form', { proveedorForm:proveedorEncontrado[0] });
                }
            ).catch(
                error => console.log(error)
            )
        }
    },
    save:function(req,res){// METODO PARA GUARDAR 
        console.log("------------------");
        console.log("ENTRANDO A LA FUNCION GUARDAR");
        console.log(req.body.idProveedor);
        if(req.body.idProveedor == 0){
            db.collection("proveedores").count().then( // OBTENGO EL TOTAL DE ELEMENTOS
                countproveedores => {
                    var proveedor = {}     
                    proveedor.idProveedor = countproveedores+ 1;
                    proveedor.proveedor = req.body.proveedor;
                    proveedor.producto = req.body.producto;
                    proveedor.telefono = req.body.telefono;
                    proveedor.correo = req.body.correo;
                    console.log(proveedor);
                    db.collection("proveedores").insertOne(proveedor).then(
                        ()=>{
                            res.redirect('/proveedor/list');// REGRESAR A LISTAR
                        }
                    ).catch(
                        error => console.error(error)
                    );
                }
            );
        }else{
            console.log("Editando..");
            var proveedor = {}
            proveedor.idProveedor = parseInt(req.body.idProveedor);
            proveedor.proveedor =req.body.proveedor;
            proveedor.producto = req.body.producto;
            proveedor.telefono = req.body.telefono;
            proveedor.correo = req.body.correo;
            console.log(proveedor);
            db.collection("proveedores").updateOne(   {idProveedor:{$eq:parseInt(req.body.idProveedor)}},
                                                    {$set:proveedor}
                                                )
                .then(
                    () => {
                        res.redirect('/proveedor/list');
                    }
                ).catch(
                    error => console.log(error)
                )
        }
    }
}

module.exports = controller;