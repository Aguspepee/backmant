const mongoose = require("../bin/server");
const errorMessage = require("../utils/errorMessage");

//Schema
const lineasNovedadesShema = mongoose.Schema({
  Orden: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
    minlength: [8, errorMessage.GENERAL.min_length],
  },
  Ubicac_tecnica: {
    type: String,
    default: null,
  },
  Punto_de_medida: {
    type: String,
    default: null,
  },
  Documento_med: {
    type: String,
    default: null,
  },
  Equipo: {
    type: String,
    default: null,
  },
  Denominacion: {
    type: String,
    default: null,
  },
  Posicion_medida: {
    type: String,
    default: null,
  },
  Fecha: {
    type: String,
    default: null,
  },
  Grupo_codigos: {
    type: String,
    default: null,
  },
  Codigo_valorac: {
    type: String,
    default: null,
  },
  Codif_txt_cod: {
    type: String,
    default: null,
  },
  Texto: {
    type: String,
    default: null,
  },
  Valor_medido: {
    type: Number,
    default: null,
  },
  Codigo_Interno: {
    type: String,
    default: function () {
      return this.Equipo.split("-",2)[1];
    },
  },
  Fecha_Mes: {
    type: String,
    default: function () {
      return this.Fecha.slice(3, 5);
    },
  },
  Fecha_Año: {
    type: String,
    default: function () {
      return this.Fecha.slice(6, 10);
    },
  },
  Piquete: {
    type: String,
    default: function () {
      return Number(this.Equipo.split("-")[3].slice(1,5));
    },
  },
});

module.exports = mongoose.model("lineas_novedades", lineasNovedadesShema);
