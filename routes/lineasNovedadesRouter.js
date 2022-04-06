const express = require("express");
const router = express.Router();
const lineasNovedadesController = require("../controllers/lineasNovedadesController");

//----RUTAS GENERALES----//
//Obtener TODOS los documentos de la base de datos de Lineas (lineasNovedades)
router.get('/',lineasNovedadesController.getAll)
//Obtener TODOS los documentos de la base de datos de Lineas (lineasNovedades)
router.get('/resume',lineasNovedadesController.resumeAll)
//Carga TODOS los documentos a la base de datos de Lineas (lineasNovedades)
router.post('/',lineasNovedadesController.createAll)
//Actualiza uno por uno los irems de la base de datos de Lineas (lineasNovedades)
router.put('/',lineasNovedadesController.updateOneByOne)
//Elimina TODOS los documentos a la base de datos de Lineas (lineasNovedades)
router.delete('/',lineasNovedadesController.deleteAll)





module.exports = router; 