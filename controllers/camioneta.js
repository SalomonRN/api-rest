var validator = require("validator");
const Camioneta = require("../models/Camioneta");
let fecha = new Date();
var controller = {
    probando: function(req,res){
        return res.status(200).send({
            message:"Estoy en el metodo probando Camioneta"
        });
    },

    testeando: function(req,res){
        return res.status(200).send({
            message:"Estoy en el metodo testeando Camioneta"
        });
    },

    save:function(req,res){
        var params = req.body;
        var validate_name = !validator.isEmpty(params.name);
        var validate_brand = !validator.isEmpty(params.brand);
        var validate_year = !validator.isEmpty(params.year);
        var validate_description = !validator.isEmpty(params.description);
        var validate_status = !validator.isEmpty(params.status);
        var validate_price = !validator.isEmpty(params.price);
        var validate_image = !validator.isEmpty(params.image);

        if(validate_name && validate_brand && validate_year && validate_description && validate_price && validate_status && validate_image){

            var camioneta = new Camioneta();
            camioneta.name = params.name;
            camioneta.brand = params.brand;
            camioneta.year = params.year;
            camioneta.description = params.description;
            camioneta.status = params.status; 
            camioneta.price = params.price; 
            camioneta.image = params.image; 
            console.log(camioneta);
            
            camioneta.save((err, userStored) =>{
                if(err || !userStored){
                    return res.status(404).send({
                        message:"El camioneta no se guardó",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message:"Camioneta Guardado"
                });
            });
            
        }else{
            return res.status(200).send({
                message:"Validación de datos incorrecto CAMIONETA"
            });
        }
        
    },

    update:function(req,res){
        var params = req.body;
        var idCamioneta = req.params.id;
        console.log(idCamioneta);
        var validate_name = !validator.isEmpty(params.name);
        var validate_brand = !validator.isEmpty(params.brand);
        var validate_year = !validator.isEmpty(params.year);
        var validate_description = !validator.isEmpty(params.description);
        var validate_price = !validator.isEmpty(params.price);
        var validate_image = !validator.isEmpty(params.image);
        if(validate_name && validate_brand && validate_year && validate_description && validate_price && validate_image){
            
            var update = {
                name:params.name,
                brand:params.brand,
                year:params.year,
                description:params.description,
                price:params.price,
                image:params.image
            }

            Camioneta.findByIdAndUpdate({_id:idCamioneta},update,{rawResult:true},(err, camionetaUpdate)=>{
                if(err){
                    return res.status(500).send({
                        message:"Error en la petición",
                        status:"Error"
                    }),console.log(err);
                }

                if(!camionetaUpdate){
                    return res.status(404).send({
                        message:"Camioneta no actualizado",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message:"Camioneta actualizado correctamente",
                    status:"success",
                    camionetaUpdate
                })
            })

            

        }else{
            return res.status(200).send({
                message:"Validación de datos invalido"
            });
        }
        
    },

    eliminar:function(req,res){
        var usuarioId = req.params.id;
        Camioneta.findOneAndDelete({_id:usuarioId},(err,camionetaRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                });
            }

            if(!camionetaRemoved){
                return res.status(404).send({
                    message:"Camioneta no eliminado",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Camioneta eliminada exitosamente",
                camionetas:camionetaRemoved
            });
        })
        
    },

    listarCamionetas:function(req,res){

        Camioneta.find(function(err,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Camionetas",
                doc
            });

            
        });
        
    },

    mostrarCamioneta:function(req,res){
        var camionetaId = req.params.id;
        Camioneta.findById(camionetaId)
               .exec((err,camioneta)=>{
                    if(err){
                        return res.status(500).send({
                            message:"Error en la petición",
                            status:"Error"
                        });
                    }
        
                    if(!camioneta){
                        return res.status(404).send({
                            message:"-Camioneta no encontrado",
                            status:"Error"
                        });
                    }
                    return res.status(200).send({
                        message:"Este es una Camioneta",
                        camioneta
                    });
               })
        
    },
    
    alquilar:function(req,res){

        var camionetaId = req.params.id;

        var update = {
            rented:fecha,
            status:"Alquilada"
        };

            Camioneta.findOneAndUpdate({camionetaId},update,{new:true},(err, camionetaUpdate)=>{
                if(err){
                    return res.status(500).send({
                        message:"Error en la petición",
                        status:"Error"
                    });
                }

                if(!camionetaUpdate){
                    return res.status(404).send({
                        message:"-Camioneta no actualizado",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message:"Camioneta Alquilada correctamente",
                    status:"success",
                    camionetaUpdate
                });
            })



        
    },
}


module.exports = controller;