const express = require("express");
const router = express.Router();
const sapController = require("../controllers/sapController");

//----RUTAS GENERALES----//
//Obtener TODOS los documentos de la base de datos SAP (saps)
router.get('/',sapController.getAll)
//Elimina TODOS los documentos a la base de datos SAP (saps)
router.delete('/',sapController.deleteAll)
//Carga TODOS los documentos a la base de datos SAP (saps)
router.post('/',sapController.createAll)

//----RUTAS PARTICULARES----//
//Obtener matriz con las rutas entre las fechas 
router.get('/filterGeneral/:Month-:Year-:Cl_actividad_PM-:Clase_de_orden-:Grupo_planif-:Texto_breve-:Pto_tbjo_resp-:Operacion',sapController.filterGeneral)

module.exports = router;