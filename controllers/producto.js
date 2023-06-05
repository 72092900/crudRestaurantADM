'use strict'

var client = require("../database/db");
var db = client.db("empleadosdb"); // SELECCIONANDO LA BASE DE DATOS

var controller = {
    listar: function (req, res) {
        console.log("-----------------------");
        console.log("ENTRANDO A LA FUNCION LISTAR");
        db.collection("productos").find().toArray().then(
            productos => {
                res.render('producto_list', { dataProductos: productos });
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
            var producto = {}
            producto.idProducto = 0;
            producto.producto = "";
            producto.familia = "";
            producto.precio = "";
            producto.estado = "";
            res.render('producto_form', { productoForm: producto });
        }else{
            db.collection("productos").find({idProducto: parseInt(req.params.id)}).toArray().then(
                productoEncontrado => {
                    console.log(productoEncontrado[0] );
                    res.render('producto_form', { productoForm:productoEncontrado[0] });
                }
            ).catch(
                error => console.log(error)
            )
        }
    },
    save:function(req,res){// METODO PARA GUARDAR 
        console.log("------------------");
        console.log("ENTRANDO A LA FUNCION GUARDAR");
        console.log(req.body.idProducto);
        if(req.body.idProducto == 0){
            db.collection("productos").count().then( // OBTENGO EL TOTAL DE ELEMENTOS
                countProductos => {
                    var producto = {}     
                    producto.idProducto = countProductos + 1;
                    producto.producto = req.body.producto;
                    producto.familia = req.body.familia;
                    producto.precio = req.body.precio;
                    producto.estado = req.body.estado;
                    console.log(producto);
                    db.collection("productos").insertOne(producto).then(
                        ()=>{
                            res.redirect('/producto/list');// REGRESAR A LISTAR
                        }
                    ).catch(
                        error => console.error(error)
                    );
                }
            );
        }else{
            console.log("Editando..");
            var producto = {}
            producto.idProducto = parseInt(req.body.idProducto);
            producto.producto =req.body.producto;
            producto.familia = req.body.familia;
            producto.precio = req.body.precio;
            producto.estado = req.body.estado;
            console.log(producto);
            db.collection("productos").updateOne(   {idProducto:{$eq:parseInt(req.body.idProducto)}},
                                                    {$set:producto}
                                                )
                .then(
                    () => {
                        res.redirect('/producto/list');
                    }
                ).catch(
                    error => console.log(error)
                )
        }
    }
}

module.exports = controller;