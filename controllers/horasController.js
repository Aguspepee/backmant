const horasModel = require("../models/horasModel");
const mongoose = require("../bin/server");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const documents = await horasModel.find();
      res.json(documents);
      res.send(documents);
      console.log("Documentos", documents);
    } catch (e) {
      console.log(e);
      e.status = 400;
      next(e);
    }
  },

  getByZone: async function (req, res, next) {
      let Zona = req.params.Zona
      let Month = req.params.Month
      let Year = req.params.Year
    try {
      const documents = await horasModel.findOne({Zona:Zona,Mes:Month});
      res.json(documents);
      //res.send(documents);
      console.log("Documentos", documents);
    } catch (e) {
      console.log(e);
      e.status = 400;
      next(e);
    }
  },
};
