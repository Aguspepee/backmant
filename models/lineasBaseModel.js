const mongoose = require("../bin/server");
const errorMessage = require("../utils/errorMessage");

//Schema
const sapsShema = mongoose.Schema({
  Codigo: {
    type: String,
    default: "",
  },
  Codigo_Tension:  {
    type: String,
    default: "null",
  },
  TENS_kV:  {
    type: Number,
    default: 0,
  },
  DENOMINACION_LAT:  {
    type: String,
    default: "null",
  },
  Notas:  {
    type: String,
    default: "null",
  },
  Long_Oficial_km:   {
    type: Number,
    default: 0,
  },
  Long_Planim_Km:   {
    type: Number,
    default: 0,
  },
  Long_Dif_Km:   {
    type: Number,
    default: 0,
  },
  Año_P_Serv:   {
    type: String,
    default: "null",
  },
  S_mm2:   {
    type: String,
    default: "null",
  },
  HG_mm2:   {
    type: String,
    default: "null",
  },
  Material_Conductor:   {
    type: String,
    default: "null",
  },
  Tipo_de_Estructura:   {
    type: String,
    default: "null",
  },
  Compartida_km:   {
    type: String,
    default: "null",
  },
  Torres_Cantidad:   {
    type: Number,
    default: 0,
  },
  Suspension_Cantidad:   {
    type: Number,
    default: 0,
  },
  Aisladores_Suspension_Cantidad:   {
    type: Number,
    default: 0,
  },
  Suspension_Masa:   {
    type: Number,
    default: 0,
  },
  Retension_Cantidad:   {
    type: Number,
    default: 0,
  },
  Aisladores_Retension_Cantidad:   {
    type: Number,
    default: 0,
  },
  Retension_Masa:   {
    type: Number,
    default: 0,
  },
  Altura_Cond:   {
    type: String,
    default: "null",
  },
  Ta:   {
    type: String,
    default: "null",
  },
  Zona:   {
    type: String,
    default: "null",
  },
  Servidumbre_Urbana:   {
    type: Number,
    default: 0,
  },
  Servidumbre_Rural:   {
    type: Number,
    default: 0,
  },
  Sale:   {
    type: String,
    default: "null",
  },
  Llega:  {
    type: String,
    default: "null",
  },
  BDE:   {
    type: Number,
    default: 0,
  },
  IDQ:   {
    type: Number,
    default: 0,
  },
  Observaciones:   {
    type: String,
    default: "null",
  },
  Resistencia_Terreno:   {
    type: Number,
    default: 0,
  },
  Pot_Nat:   {
    type: Number,
    default: 0,
  },
  Imped_Caract:   {
    type: Number,
    default: 0,
  },
  Const_Atenuac:   {
    type: Number,
    default: 0,
  },
  Const_Fase:   {
    type: Number,
    default: 0,
  },
  Vel_Prop:   {
    type: Number,
    default: 0,
  },
  R:   {
    type: Number,
    default: 0,
  },
  X:   {
    type: Number,
    default: 0,
  },
  B:   {
    type: Number,
    default: 0,
  },
  R0:   {
    type: Number,
    default: 0,
  },
  X0:   {
    type: Number,
    default: 0,
  },
  B0:  {
    type: Number,
    default: 0,
  },
  Limite_termico:   {
    type: String,
    default: "null",
  },
  Propietario:   {
    type: String,
    default: "null",
  },
  Show:   {
    type: String,
    default: "true",
  },
});

module.exports = mongoose.model("sap_bases", sapsShema);
