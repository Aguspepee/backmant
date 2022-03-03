const mongoose = require("../bin/server");
const errorMessage = require("../utils/errorMessage")

//Schema
const sapsShema = mongoose.Schema({
  Orden: {
    type:String,
    required:[true, errorMessage.GENERAL.campo_obligatorio],
    minlength:[8, errorMessage.GENERAL.min_length]
  },
  Equipo:{
    type:String,
    required:[true, errorMessage.GENERAL.campo_obligatorio],
  },
  Ubicac_técnica: {
    type:String,
    required:[true, errorMessage.GENERAL.campo_obligatorio],
  },
  Texto_breve: {
    type:String,
    required:[true, errorMessage.GENERAL.campo_obligatorio],
  },
  Inicio_program: {
    type:String,
    required:[true, errorMessage.GENERAL.campo_obligatorio],
  },
  Fecha_ref: {
    type:String,
    required:[true, errorMessage.GENERAL.campo_obligatorio],
  },
  Grupo_planif: {
    type:String,
    required:[true, errorMessage.GENERAL.campo_obligatorio],
  },
  Clase_de_orden: {
    type:String,
    required:[true, errorMessage.GENERAL.campo_obligatorio],
  },
  Cl_actividad_PM: {
    type:String,
    required:[true, errorMessage.GENERAL.campo_obligatorio],
  },
  Status_usuario: {
    type:String,
    required:[true, errorMessage.GENERAL.campo_obligatorio],
  },
  Pto_tbjo_resp:{
    type:String,
    required:[true, errorMessage.GENERAL.campo_obligatorio],
  },
  Trabajo_real: {
    type:Number,
    required:[true, errorMessage.GENERAL.campo_obligatorio],
  },
  Operacion: {
    type:String,
    required:[true, errorMessage.GENERAL.campo_obligatorio],
  },
});

module.exports = mongoose.model("saps", sapsShema)
