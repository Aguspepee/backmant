const lineasNovedadesModel = require("../models/lineasNovedadesModel");
const mongoose = require("../bin/server");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const documents = await lineasNovedadesModel.aggregate([
        {
            '$group': {
                '_id': '$Codigo_Interno', 
                'fieldN': {
                    '$sum': 1
                }
            }
        }
    ]);
      res.json(documents);
      res.send(documents);
      console.log("Documentos", documents);
    } catch (e) {
      console.log(e);
      e.status = 400;
      next(e);
    }
  },

  createAll: async function (req, res, next) {
    try {
      const sap = new lineasNovedadesModel({
        Orden: req.body.Orden,
        Ubicac_tecnica: req.body.Ubicac_tecnica,
        Punto_de_medida: req.body.Punto_de_medida,
        Documento_med: req.body.Documento_med,
        Equipo: req.body.Equipo,
        Denominacion: req.body.Denominacion,
        Posicion_medida: req.body.Posicion_medida,
        Fecha: req.body.Fecha,
        Grupo_codigos: req.body.Grupo_codigos,
        Codigo_valorac: req.body.Codigo_valorac,
        Codif_txt_cod: req.body.Codif_txt_cod,
        Texto: req.body.Texto,
        Valor_medido: req.body.Valor_medido,
      });
      const document = await lineasNovedadesModel.create(req.body);
      console.log("se creo", document);
      res.json(document);
    } catch (e) {
      console.log(e);
      e.status = 400;
      next(e);
    }
  },

  deleteAll: async function (req, res, next) {
    try {
      console.log(req.params, req.body);
      const update = await lineasNovedadesModel.remove({});
      res.json(req.params.id);
    } catch (e) {
      e.status = 400;
      next(e);
    }
  },

};
