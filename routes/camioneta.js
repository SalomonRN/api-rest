var express = require ("express");
var CamionetaController = require("../controllers/camioneta");

var router = express.Router();

router.get("/camionetas",CamionetaController.listarCamionetas);
router.get("/mostrarCamioneta/:id",CamionetaController.mostrarCamioneta);


router.post("/guardarCamioneta",CamionetaController.save);

router.put("/actualizarCamioneta/:id",CamionetaController.update);
router.put("/alquilar/:id",CamionetaController.alquilar);

router.delete("/eliminarCamioneta/:id",CamionetaController.eliminar);




module.exports = router;