'use strict'

var client = require("../database/db");
var db = client.db("empleadosdb"); // SELECCIONANDO LA BASE DE DATOS

var controller = {
    listar: function (req, res) {
        console.log("-----------------------");
        console.log("ENTRANDO A LA FUNCION LISTAR");
        db.collection("clientes").find().toArray().then(
            clientes => {
                res.render('cliente_list', { dataClientes: clientes });
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
            var cliente = {}
            cliente.idCliente = 0;
            cliente.nombApellido = "";
            cliente.email = "";
            cliente.platilloFrecuente = "";
            cliente.suscripcion = "";
            res.render('cliente_form', { clienteForm: cliente });
        }else{
            db.collection("clientes").find({idCliente: parseInt(req.params.id)}).toArray().then(
                clienteEncontrado => {
                    console.log(clienteEncontrado[0] );
                    res.render('cliente_form', { clienteForm:clienteEncontrado[0] });
                }
            ).catch(
                error => console.log(error)
            )
        }
    },
    save:function(req,res){// METODO PARA GUARDAR 
        console.log("------------------");
        console.log("ENTRANDO A LA FUNCION GUARDAR");
        console.log(req.body.idCliente);
        if(req.body.idCliente == 0){
            db.collection("clientes").count().then( // OBTENGO EL TOTAL DE ELEMENTOS
                countClientes => {
                    var cliente = {}     
                    cliente.idCliente = countClientes + 1;
                    cliente.nombApellido = req.body.nombApellido;
                    cliente.email = req.body.email;
                    cliente.platilloFrecuente = req.body.platilloFrecuente;
                    cliente.suscripcion = req.body.suscripcion;
                    console.log(cliente);
                    db.collection("clientes").insertOne(cliente).then(
                        ()=>{
                            res.redirect('/cliente/list');// REGRESAR A LISTAR
                        }
                    ).catch(
                        error => console.error(error)
                    );
                }
            );
        }else{
            console.log("Editando..");
            var cliente = {}
            cliente.idCliente = parseInt(req.body.idCliente);
            cliente.nombApellido =req.body.nombApellido;
            cliente.email = req.body.email;
            cliente.platilloFrecuente = req.body.platilloFrecuente;
            cliente.suscripcion = req.body.suscripcion;
            console.log(cliente);
            db.collection("clientes").updateOne(   {idCliente:{$eq:parseInt(req.body.idCliente)}},
                                                    {$set:cliente}
                                                )
                .then(
                    () => {
                        res.redirect('/cliente/list');
                    }
                ).catch(
                    error => console.log(error)
                )
        }
    }
}

module.exports = controller;