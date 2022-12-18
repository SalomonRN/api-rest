const mongoose = require ("mongoose");
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    name: String,
    surname: String,
    email:String,
    password:String,
    image:String,
    role:String,
    createdAt: {type:Date, default: Date.now},
    updated:String,
    timeupdated:String
})
UsuarioSchema.set("timestamps", true);


module.exports = mongoose.model("Usuario", UsuarioSchema);