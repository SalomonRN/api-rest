/**
 * DATE en CUANDO SE AGREGÓ, CUANDO SE ACTUALIZÓ 
 */
var validator = require("validator");
var Usuario = require("../models/Usuarios");

var controller = {


    save:function(req,res){
        var params = req.body;
        var validate_name = !validator.isEmpty(params.name);
        var validate_surname = !validator.isEmpty(params.surname);
        var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email) ;
        var validate_password = !validator.isEmpty(params.password);
        console.log(validate_email);
        if(validate_name && validate_surname && validate_email && validate_password){
            var usuario = new Usuario();
            usuario.name = params.name;
            usuario.surname = params.surname;
            usuario.email = params.email;
            usuario.password = params.password;
            usuario.image = null;
            usuario.role = "Rol de Usuario";  
            console.log(usuario);
            usuario.save((err, userStored) =>{
                if(err || !userStored){
                    return res.status(404).send({
                        message:"El usuario no se guardó",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message:"Usuario Guardado"
                });
            });
            
        }else{
            return res.status(200).send({
                message:"Validación de datos incorrecto"
            });
        }
        
    },



    update:function(req,res){
        var params = req.body;
        var usuarioId = req.params.id;
        var validate_name = !validator.isEmpty(params.name);
        var validate_surname = !validator.isEmpty(params.surname);
        var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email) ;
        var validate_password = !validator.isEmpty(params.password);
        if(validate_name && validate_surname && validate_email && validate_password){
            const date = new Date();
            console.log(date.toLocaleString());
        
            
            var update = {
                name:params.name,
                surname:params.surname,
                email:params.email,
                password:params.password            
                
            }

            Usuario.findByIdAndUpdate({_id:usuarioId},update,{rawResult:true},(err, userUpdate)=>{
                if(err){
                    return res.status(500).send({
                        message:"Error en la petición",
                        status:"Error"
                    });
                }

                if(!userUpdate){
                    return res.status(404).send({
                        message:"-usuario no actualizado",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message:"actualizado correctamente",
                    status:"success",
                    userUpdate
                });
            })

            

        }else{
            return res.status(200).send({
                message:"Validación de datos invalido"
            });
        } 
    },

    eliminar:function(req,res){
        var usuarioId = req.params.id;
        Usuario.findOneAndDelete({_id:usuarioId},(err,userRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                });
            }

            if(!userRemoved){
                return res.status(404).send({
                    message:"-usuario no eliminado",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Eliminado exitosamente",
                usuario:userRemoved
            });
        })
        
    },

    listarUsuarios:function(req,res){

        Usuario.find(function(err,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Usuarios",
                doc
            });

            
        });
        
    },

    mostrarUsuario:function(req,res){
        var usuarioId = req.params.id;
        Usuario.findById(usuarioId)
               .exec((err,usuario)=>{
                    if(err){
                        return res.status(500).send({
                            message:"Error en la petición",
                            status:"Error"
                        });
                    }
        
                    if(!usuario){
                        return res.status(404).send({
                            message:"-usuario no encontrado",
                            status:"Error"
                        });
                    }
                    return res.status(200).send({
                        message:"Este es un usuario",
                        usuario
                    });
               })
        
    },

}


module.exports = controller;