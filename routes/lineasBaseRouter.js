const express = require("express");
const router = express.Router();
const lineasBaseController = require("../controllers/lineasBaseController");

//----RUTAS GENERALES----//
//Obtener TODOS los documentos de la base de datos de Lineas (lineasBase)
router.get('/',lineasBaseController.getAll)
//Elimina TODOS los documentos a la base de datos de Lineas (lineasBase)
router.delete('/',lineasBaseController.deleteAll)
//Carga TODOS los documentos a la base de datos de Lineas (lineasBase)
router.post('/',lineasBaseController.createAll)

//Obrener distribución de horas 
router.get('/novedadesResumen/:Month-:Year-:Grupo_planif-:Tipo',lineasBaseController.NovedadesResumen)
router.get('/novedadesDetalle/:Month-:Year-:Grupo_planif-:Tipo',lineasBaseController.NovedadesDetalle)

module.exports = router;