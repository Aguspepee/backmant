const express = require("express");
const router = express.Router();
const lineasNovedadesController = require("../controllers/lineasNovedadesController");

//----RUTAS GENERALES----//
//Obtener TODOS los documentos de la base de datos de Lineas (lineasNovedades)
router.get('/',lineasNovedadesController.getAll)
//Elimina TODOS los documentos a la base de datos de Lineas (lineasNovedades)
router.delete('/',lineasNovedadesController.deleteAll)
//Carga TODOS los documentos a la base de datos de Lineas (lineasNovedades)
router.post('/',lineasNovedadesController.createAll)




module.exports = router; 