const mongoose = require ("mongoose");
var Schema = mongoose.Schema;
/*var today = new Date();
var now = today.toLocaleString();*/

var CamionetaSchema = new Schema({
    name: String,
    brand: String,
    year: Number,
    description:String,
    status:String,
    updatedAt:String,
    rented:String,
    timerented:String,
    devolution:String,
    timedevolution:String
})
CamionetaSchema.set("timestamps", true);

module.exports = mongoose.model("Camioneta", CamionetaSchema);