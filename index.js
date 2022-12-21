const express = require("express");
const app = express();
//const Camioneta = require("./models/Camioneta")
const bodyParser = require("body-parser");
const cors = require("cors");
let fecha = new Date();
//var camionetaId = "63a26cfce99578c2b37e5c34";
const mongoose = require("mongoose");
const port = 3000;
const user_routes = require("./routes/usuario");
const cam_routes = require("./routes/camioneta");

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/api",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4
})
.then(() =>{
    app.use(express.json())
    app.use("/api",user_routes);
    app.use("/api",cam_routes);
    app.listen(port, () =>{
        console.log("Servidor corriendo en el puerto", port);
    })
})
.catch(error=>console.log(error));

