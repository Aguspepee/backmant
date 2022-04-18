const mongoose = require("../bin/server");
const errorMessage = require("../utils/errorMessage");
const grupos = require("../utils/equivalencias");

//Schema
const sapsBaseShema = mongoose.Schema({
  Orden: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
    minlength: [8, errorMessage.GENERAL.min_length],
  },
  Equipo: {
    type: String,
    default: "",
  },
  Ubicac_técnica: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  Texto_breve: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  Inicio_program: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  Fecha_ref: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  Grupo_planif: {
    type: String,
    default: "",
  },
  Clase_de_orden: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  Cl_actividad_PM: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  Status_usuario: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  Pto_tbjo_resp: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  Trabajo_real: {
    type: Number,
    cast: v => { return v ? Number(v.replace(/,/g, '')) : v },
    default: 0,
  },
  Operacion: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  Fecha_ref_Mes: {
    type: Number,
    default: function () {
      return Number(this.Fecha_ref.split("/", 3)[0]);
    },
  },
  Fecha_ref_Año: {
    type: Number,
    default: function () {
      return Number(this.Fecha_ref.split("/", 3)[2]);
    },
  },
  Inicio_program_Mes: {
    type: Number,
    default: function () {
      return Number(this.Fecha_ref.split("/", 3)[0]);
    },
  },
  Inicio_program_Año: {
    type: Number,
    default: function () {
      return Number(this.Fecha_ref.split("/", 3)[2]);
    },
  },

  Grupo_Agrupamiento: {
    type: String,
    // default: "AGRUPAAA"
    default: function () {
      let Agrupaciones = grupos.GRUPOS;
      let lista = Agrupaciones.filter((Agrupaciones) => {
        return Agrupaciones.Actividad === this.Cl_actividad_PM;
      });
      if (lista[0]) {
        lista = lista[0].NombreGrupo;
      } else {
        lista = "Otras Actividades";
      }
      return lista;
    },
  },
});

module.exports = mongoose.model("sap_bases", sapsBaseShema);
