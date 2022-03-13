const mongoose = require("../bin/server");
const errorMessage = require("../utils/errorMessage");

//Schema
const lineasBaseShema = mongoose.Schema({
  Codigo: {
    type: String,
    default: null,
  },
  Codigo_Tension:  {
    type: String,
    default: null,
  },
  TENS_kV:  {
    type: Number,
    default: null,
  },
  DENOMINACION_LAT:  {
    type: String,
    default: null,
  },
  Notas:  {
    type: String,
    default: null,
  },
  Long_Oficial_km:   {
    type: Number,
    default: null,
  },
  Long_Planim_Km:   {
    type: Number,
    default: null,
  },
  Long_Dif_Km:   {
    type: Number,
    default: null,
  },
  Año_P_Serv:   {
    type: String,
    default: null,
  },
  S_mm2:   {
    type: String,
    default: null,
  },
  HG_mm2:   {
    type: String,
    default: null,
  },
  Material_Conductor:   {
    type: String,
    default: null,
  },
  Tipo_de_Estructura:   {
    type: String,
    default: null,
  },
  Compartida_km:   {
    type: String,
    default: null,
  },
  Torres_Cantidad:   {
    type: Number,
    default: null,
  },
  Suspension_Cantidad:   {
    type: Number,
    default: null,
  },
  Aisladores_Suspension_Cantidad:   {
    type: Number,
    default: null,
  },
  Suspension_Masa:   {
    type: Number,
    default: null,
  },
  Retension_Cantidad:   {
    type: Number,
    default: null,
  },
  Aisladores_Retension_Cantidad:   {
    type: Number,
    default: null,
  },
  Retension_Masa:   {
    type: Number,
    default:null,
  },
  Altura_Cond:   {
    type: String,
    default: null,
  },
  Ta:   {
    type: String,
    default: null,
  },
  Zona:   {
    type: String,
    default: null,
  },
  Servidumbre_Urbana:   {
    type: Number,
    default: null,
  },
  Servidumbre_Rural:   {
    type: Number,
    default: null,
  },
  Sale:   {
    type: String,
    default: null,
  },
  Llega:  {
    type: String,
    default: null,
  },
  BDE:   {
    type: Number,
    default: null,
  },
  IDQ:   {
    type: Number,
    default: null,
  },
  Observaciones:   {
    type: String,
    default: null,
  },
  Resistencia_Terreno:   {
    type: Number,
    default: null,
  },
  Pot_Nat:   {
    type: Number,
    default: null,
  },
  Imped_Caract:   {
    type: Number,
    default: null,
  },
  Const_Atenuac:   {
    type: Number,
    default: null,
  },
  Const_Fase:   {
    type: Number,
    default: null,
  },
  Vel_Prop:   {
    type: Number,
    default: null,
  },
  R:   {
    type: Number,
    default: null,
  },
  X:   {
    type: Number,
    default: null,
  },
  B:   {
    type: Number,
    default: null,
  },
  R0:   {
    type: Number,
    default: null,
  },
  X0:   {
    type: Number,
    default: null,
  },
  B0:  {
    type: Number,
    default: null,
  },
  Limite_termico:   {
    type: String,
    default: null,
  },
  Propietario:   {
    type: String,
    default: null,
  },
  Show:   {
    type: String,
    default: "true",
  },
  Clave_Interna: {
    type: String,
    default: function () {

      return this.Codigo.replace("-","");
    },
  }
});

module.exports = mongoose.model("lineas_bases", lineasBaseShema);
