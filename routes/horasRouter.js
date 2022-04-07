const express = require("express");
const router = express.Router();
const horasController = require("../controllers/horasController");

//----RUTAS GENERALES----//
//Obtener TODOS los documentos de la base de datos de Horas
router.get('/',horasController.getAll)
router.get('/byZone/:Zona',horasController.getByZone)

module.exports = router;