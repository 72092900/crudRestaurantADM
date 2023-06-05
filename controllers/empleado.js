'use strict'

const { default: Swal } = require("sweetalert2");
var client = require("../database/db");
var db = client.db("empleadosdb"); // SELECCIONANDO LA BASE DE DATOS

var controller = {
    listar: function (req, res) {
        console.log("-----------------------");
        console.log("ENTRANDO A LA FUNCION LISTAR");
        db.collection("empleados").find().toArray().then(
            empleados => {
                res.render('empleado_list', { dataEmpleados: empleados });//
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
            var empleado = {}
            empleado.idEmpleado = 0;
            empleado.nombApellido = "";
            empleado.dni = "";
            empleado.telefono = "";
            empleado.direccion = "";
            empleado.puesto = "";
            res.render('empleado_form', { empleadoForm: empleado });
        }else{
            db.collection("empleados").find({idEmpleado: parseInt(req.params.id)}).toArray().then(
                empleadoEncontrado => {
                    console.log(empleadoEncontrado[0] );
                    res.render('empleado_form', { empleadoForm:empleadoEncontrado[0] });
                }
            ).catch(
                error => console.log(error)
            )
        }
    },
    save:function(req,res){// METODO PARA GUARDAR 
        console.log("------------------");
        console.log("ENTRANDO A LA FUNCION GUARDAR");
        console.log(req.body.idEmpleado);
        if(req.body.idEmpleado == 0){
            db.collection("empleados").count().then( // OBTENGO EL TOTAL DE ELEMENTOS
                countEmpleados => {
                    var empleado = {}     
                    empleado.idEmpleado = countEmpleados + 1;
                    empleado.nombApellido = req.body.nombApellido;
                    empleado.dni = req.body.dni;
                    empleado.telefono = req.body.telefono;
                    empleado.direccion = req.body.direccion;
                    empleado.puesto = req.body.puesto;
                    console.log(empleado);
                    db.collection("empleados").insertOne(empleado).then(
                        ()=>{
                            res.redirect('/empleado/list');// REGRESAR A LISTAR
                        }
                    ).catch(
                        error => console.error(error)
                    );
                }
            );
        }else{
            console.log("Editando..");
            var empleado = {}
            empleado.idEmpleado = parseInt(req.body.idEmpleado);
            empleado.nombApellido =req.body.nombApellido;
            empleado.dni = req.body.dni;
            empleado.telefono = req.body.telefono;
            empleado.direccion = req.body.direccion;
            empleado.puesto = req.body.puesto;
            console.log(empleado);
            db.collection("empleados").updateOne(   {idEmpleado:{$eq:parseInt(req.body.idEmpleado)}},
                                                    {$set:empleado}
                                                )
                .then(
                    () => {
                        res.redirect('/empleado/list');
                    }
                ).catch(
                    error => console.log(error)
                )
        }
    }
}

module.exports = controller;