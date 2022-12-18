var express = require ("express");
var UserController = require("../controllers/usuario");

var router = express.Router();

router.get("/usuarios",UserController.listarUsuarios);
router.get("/usuario/:id",UserController.mostrarUsuario);

router.post("/guardarUsuario",UserController.save);

router.put("/actualizar/:id",UserController.update);

router.delete("/eliminar/:id",UserController.eliminar);

module.exports = router;