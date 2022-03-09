const sapsModel = require("../models/sapsModel");
const mongoose = require("../bin/server");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const documents = await sapsModel.find();
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
      const sap = new sapsModel({
        Orden: req.body.Orden,
        Equipo: req.body.Equipo,
        Ubicac_técnica: req.body.Ubicac_técnica,
        Texto_breve: req.body.Texto_breve,
        Inicio_program: req.body.Inicio_program,
        Fecha_ref: req.body.Fecha_ref,
        Grupo_planif: req.body.Grupo_planif,
        Clase_de_orden: req.body.Clase_de_orden,
        Cl_actividad_PM: req.body.Cl_actividad_PM,
        Status_usuario: req.body.Status_usuario,
        Pto_tbjo_resp: req.body.Pto_tbjo_resp,
        Trabajo_real: req.body.Trabajo_real,
        Operacion: req.body.Operacion,
      });

      const document = await sapsModel.create(req.body);
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
      const update = await sapsModel.remove({});
      res.json(req.params.id);
    } catch (e) {
      e.status = 400;
      next(e);
    }
  },

  filterGeneral: async function (req, res, next) {
    try {
      let Month = req.params.Month;
      let Year = req.params.Year;
      let Cl_actividad_PM = req.params.Cl_actividad_PM;
      let Clase_de_orden = req.params.Clase_de_orden;
      if (Clase_de_orden === "false") { Clase_de_orden = "" };
      let Grupo_planif = req.params.Grupo_planif;
      let Texto_breve = req.params.Texto_breve;
      if (Texto_breve === "false") { Texto_breve = "" };
      let Pto_tbjo_resp = req.params.Pto_tbjo_resp.replace(" ", "-");
      let Operacion = req.params.Operacion;

      const filter2 = {
        $group:
        {
          _id: ["$Ubicac_técnica", "$Status_usuario"],
          Status_usuario: { $first: "$Status_usuario" }
        }
      }

      //Set documents by Status_usuario 
      const Acumulado_mensual = await sapsModel.aggregate([
        //Stage 0 - Filter by Date
        {
          $match: {
            $and: [
              { "Inicio_program_Mes": { "$eq": Month } },
              { "Inicio_program_Año": { "$eq": Year } }
            ]
          }
        },

        //Stage 1 - Filters
        {
          $match: {
            $and: [
              { "Grupo_planif": { "$eq": Grupo_planif } },
              { "Clase_de_orden": { "$regex": Clase_de_orden, "$options": "i" } },
              { "Cl_actividad_PM": { "$eq": Cl_actividad_PM } },
              { "Texto_breve": { "$regex": Texto_breve, "$options": "i" } }
            ],
          },
        },
        //Stage 2 - Delete duplicates, based on "Ubicac_técnica".
        //Si hay ubicaciones técnicas con diferentes Status, no las borra. VER SI DEBE SER ASI. 
        filter2,
        //Stage 3 - Make Groups of Status
        { $group: { _id: "$Status_usuario", count: { $sum: 1 } } },
      ]);
      res.json({
        "Grupo_planif": Grupo_planif,
        "Clase_de_orden": Clase_de_orden,
        "Cl_actividad_PM": Cl_actividad_PM,
        "Texto_breve": Texto_breve,
        "Acumulado_anual": Acumulado_mensual,
        "Acumulado_mensual": Acumulado_mensual
      });
    } catch (e) {
      console.log(e);
      e.status = 400;
      next(e);
    }
  },
};
