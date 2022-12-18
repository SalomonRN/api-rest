const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Camioneta = require("./models/Camioneta");
const mongoose = require("mongoose");
const port = 3000;
var idCamioneta = "639e1e2573a22ce38e09059f"
const user_routes = require("./routes/usuario");
const cam_routes = require("./routes/camioneta");

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended:false}));

mongoose.connect("mongodb://localhost:27017/api",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4
})
.then(() =>{
    app.use("/api",user_routes);
    app.use("/api",cam_routes);
    app.listen(port, () =>{
        console.log("Servidor corriendo en el puerto", port);
    })
})
.catch(error=>console.log(error));



    





