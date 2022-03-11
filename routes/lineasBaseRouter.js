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

//----RUTAS PARTICULARES----//
//Obtener matriz con las rutas entre las fechas 
router.get('/filterGeneral/:Month-:Year-:Cl_actividad_PM-:Clase_de_orden-:Grupo_planif-:Texto_breve-:Pto_tbjo_resp-:Operacion-:BorrarDuplicados',lineasBaseController.filterGeneral)

module.exports = router;