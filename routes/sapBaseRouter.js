const express = require("express");
const router = express.Router();
const sapBaseController = require("../controllers/sapBaseController");

//----RUTAS GENERALES----//
//Obtener TODOS los documentos de la base de datos SAP (saps)
router.get('/',sapBaseController.getAll)
//Elimina TODOS los documentos a la base de datos SAP (saps)
router.delete('/',sapBaseController.deleteAll)
//Carga TODOS los documentos a la base de datos SAP (saps)
router.post('/',sapBaseController.createAll)

//----RUTAS PARTICULARES----//
//Obtener matriz con las rutas entre las fechas 
router.get('/filterGeneral/:Month-:Year-:Cl_actividad_PM-:Clase_de_orden-:Grupo_planif-:Texto_breve-:Pto_tbjo_resp-:Operacion-:BorrarDuplicados',sapBaseController.filterGeneral)

//Obrener distribución de horas 
router.get('/DistibucionHoraria/:Month-:Year-:Grupo_planif',sapBaseController.distribucionHoraria)

//Resumen anual por mes
router.get('/resumenAnual/:Year-:Cl_actividad_PM-:Clase_de_orden-:Grupo_planif-:Texto_breve-:Pto_tbjo_resp-:Operacion-:BorrarDuplicados',sapBaseController.resumenAnual)


module.exports = router;