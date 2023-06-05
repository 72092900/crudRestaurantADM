'use strict'  

//REQUIRES
var mongoose = require('mongoose');   
var app = require('./app');   //IMPORTAMOS EL ARCHIVO APP

// PUERTO SERVIDOR
var port = process.env.PORT || 3999;

mongoose.Promise = global.Promise;  
mongoose.connect('mongodb+srv://angelrh3:miguelangel456mrhK@cluster0.pyr5m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }) 
    .then(
        () => { 
            console.log('La conexion a la bd es correcta Vamos Perú rumbo al mundial QATAR 2022');
            // CREAR EL SERVIDOR 
            app.listen(port,()=>{
                console.log('El sevidor http://localhost:3999 esta funcionando.');
            });
        }
    )
    .catch(error => console.log(error));