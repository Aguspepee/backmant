const mongoose = require("../bin/server");
const errorMessage = require("../utils/errorMessage");

//Schema
const horasShema = mongoose.Schema({
  Zona: {
    type: String,
    default: null,
  },
  Horas: {
    type: Number,
    default: 0,
  },
  Mes:{
    type: Number,
    default: 0,
  },
  Año:{
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("horas_bases", horasShema);
