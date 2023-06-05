const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb+srv://angelrh3:miguelangel456mrhK@cluster0.pyr5m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"); // URL DE LA BASE DE DATOS DE MONGODB
client.connect().then(
    (response) => {
        console.log('La conexion a la bd es correcta - url:' + response.s.url);
    },
    (error) => {
        console.error('error:' + error)
    }
)

module.exports = client;