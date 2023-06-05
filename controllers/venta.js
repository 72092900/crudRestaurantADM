'use strict'

var client = require("../database/db");
var db = client.db("empleadosdb"); // SELECCIONANDO LA BASE DE DATOS

var controller = {
    listar: function (req, res) {
        console.log("-----------------------");
        console.log("ENTRANDO A LA FUNCION LISTAR");
        db.collection("ventas").find().toArray().then(
            ventas => {
                res.render('venta_list', { dataVentas: ventas });
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
            var venta = {}
            venta.idVenta = 0;
            venta.cliente = "";
            venta.codMesa = "";
            venta.descripcion = "";
            venta.total = "";
            res.render('venta_form', { ventaForm: venta });
        }else{
            db.collection("ventas").find({idVenta: parseInt(req.params.id)}).toArray().then(
                ventaEncontrado => {
                    console.log(ventaEncontrado[0] );
                    res.render('venta_form', { ventaForm:ventaEncontrado[0] });
                }
            ).catch(
                error => console.log(error)
            )
        }
    },
    save:function(req,res){// METODO PARA GUARDAR 
        console.log("------------------");
        console.log("ENTRANDO A LA FUNCION GUARDAR");
        console.log(req.body.idVenta);
        if(req.body.idVenta == 0){
            db.collection("ventas").count().then( // OBTENGO EL TOTAL DE ELEMENTOS
                countVentas => {
                    var venta = {}     
                    venta.idVenta = countVentas + 1;
                    venta.cliente = req.body.cliente;
                    venta.codMesa = req.body.codMesa;
                    venta.descripcion = req.body.descripcion;
                    venta.total= req.body.total;
                    console.log(venta);
                    db.collection("ventas").insertOne(venta).then(
                        ()=>{
                            res.redirect('/venta/list');// REGRESAR A LISTAR
                        }
                    ).catch(
                        error => console.error(error)
                    );
                }
            );
        }else{
            console.log("Editando..");
            var venta = {}
            venta.idVenta = parseInt(req.body.idVenta);
            venta.cliente =req.body.cliente;
            venta.codMesa = req.body.codMesa;
            venta.descripcion = req.body.descripcion;
            venta.total = req.body.total;
            console.log(venta);
            db.collection("ventas").updateOne(   {idVenta:{$eq:parseInt(req.body.idVenta)}},
                                                    {$set:venta}
                                                )
                .then(
                    () => {
                        res.redirect('/venta/list');
                    }
                ).catch(
                    error => console.log(error)
                )
        }
    }
}

module.exports = controller;