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
      //Se definen los parámetros para los filtros
      let Month = req.params.Month;
      let Year = req.params.Year;
      let Cl_actividad_PM = req.params.Cl_actividad_PM;
      let Clase_de_orden = req.params.Clase_de_orden;
      if (Clase_de_orden === "false") {
        Clase_de_orden = "";
      }
      let Grupo_planif = req.params.Grupo_planif;
      let Texto_breve = req.params.Texto_breve;
      if (Texto_breve === "false") {
        Texto_breve = "";
      }
      let Pto_tbjo_resp = req.params.Pto_tbjo_resp;
      if (Pto_tbjo_resp === "false") {
        Pto_tbjo_resp = "";
      }
      let Operacion = req.params.Operacion;
      let BorrarDuplicados = req.params.BorrarDuplicados;

      //-------FILTROS--------//
      //FILTRO Mensual Inicio Pogramado
      let FiltroMensualInicioProgramado = {
        $match: {
          $and: [
            { Inicio_program_Mes: { $eq: Month } },
            { Inicio_program_Año: { $eq: Year } },
          ],
        },
      };

      //FILTRO Anual Inicio Pogramado
      let FiltroAnualInicioProgramado = {
        $match: {
          $and: [{ Inicio_program_Año: { $eq: Year } }],
        },
      };

      //FILTRO Mensual Fecha Referencia
      let FiltroMensualFechaReferencia = {
        $match: {
          $and: [
            { Fecha_ref_Mes: { $eq: Month } },
            { Fecha_ref_Año: { $eq: Year } },
          ],
        },
      };

      //FILTRO Anual Fecha Referencia
      let FiltroAnualFechaReferencia = {
        $match: {
          $and: [{ Fecha_ref_Año: { $eq: Year } }],
        },
      };

      //FILTRO Borrar Duplicados
      //Si hay ubicaciones técnicas con diferentes Status, no las borra.
      let FiltroBorrarDuplicados;
      if (BorrarDuplicados === "true") {
        FiltroBorrarDuplicados = {
          $group: {
            _id: ["$Ubicac_técnica", "$Status_usuario"],
            Status_usuario: { $first: "$Status_usuario" },
          },
        };
      } else {
        FiltroBorrarDuplicados = { $match: {} };
      }

      //FILTRO Filtros generales
      let FiltroFiltrosGenerales = {
        $match: {
          $and: [
            { Grupo_planif: { $eq: Grupo_planif } },
            { Clase_de_orden: { $regex: Clase_de_orden, $options: "i" } },
            { Pto_tbjo_resp: { $regex: Pto_tbjo_resp, $options: "i" } },
            { Cl_actividad_PM: { $eq: Cl_actividad_PM } },
            { Texto_breve: { $regex: Texto_breve, $options: "i" } },
            { Operacion: { $eq: Operacion } },
          ],
        },
      };

      //Set documents by Status_usuario
      const Inicio_Programado_Mensual = await sapsModel.aggregate([
        //Stage 0 - Filter by Date
        FiltroMensualInicioProgramado,
        //Stage 1 - Filters
        FiltroFiltrosGenerales,
        //Stage 2 - Delete duplicates, based on "Ubicac_técnica".
        FiltroBorrarDuplicados,
        //Stage 3 - Make Groups of Status
        { $group: { _id: "$Status_usuario",Status:{$first:"$Status_usuario"}, Count: { $sum: 1 } } },
        { $project : { _id : 0, Status : 1 , Count : 1 } }

      ]);

      const Inicio_Programado_Anual = await sapsModel.aggregate([
        //Stage 0 - Filter by Date
        FiltroAnualInicioProgramado,
        //Stage 1 - Filters
        FiltroFiltrosGenerales,
        //Stage 2 - Delete duplicates, based on "Ubicac_técnica".
        FiltroBorrarDuplicados,
        //Stage 3 - Make Groups of Status
        { $group: { _id: "$Status_usuario",Status:{$first:"$Status_usuario"}, Count: { $sum: 1 } } },
        { $project : { _id : 0, Status : 1 , Count : 1 } }
      ]);

      const Fecha_Referencia_Mensual = await sapsModel.aggregate([
        //Stage 0 - Filter by Date
        FiltroMensualInicioProgramado,
        //Stage 1 - Filters
        FiltroFiltrosGenerales,
        //Stage 2 - Delete duplicates, based on "Ubicac_técnica".
        FiltroBorrarDuplicados,
        //Stage 3 - Make Groups of Status
        { $group: { _id: "$Status_usuario",Status:{$first:"$Status_usuario"}, Count: { $sum: 1 } } },
        { $project : { _id : 0, Status : 1 , Count : 1 } }
      ]);

      const Fecha_Referencia_Anual = await sapsModel.aggregate([
        //Stage 0 - Filter by Date
        FiltroAnualInicioProgramado,
        //Stage 1 - Filters
        FiltroFiltrosGenerales,
        //Stage 2 - Delete duplicates, based on "Ubicac_técnica".
        FiltroBorrarDuplicados,
        //Stage 3 - Make Groups of Status
        { $group: { _id: "$Status_usuario",Status:{$first:"$Status_usuario"}, Count: { $sum: 1 } } },
        { $project : { _id : 0, Status : 1 , Count : 1 } }
      ]);

      //RESPUESTA
      res.json({
        Grupo_planif: Grupo_planif,
        Clase_de_orden: Clase_de_orden,
        Cl_actividad_PM: Cl_actividad_PM,
        Pto_tbjo_resp: Pto_tbjo_resp,
        Texto_breve: Texto_breve,
        Inicio_Programado_Mensual: Inicio_Programado_Mensual,
        Inicio_Programado_Anual: Inicio_Programado_Anual,
        Fecha_Referencia_Mensual: Inicio_Programado_Mensual,
        Fecha_Referencia_Anual: Inicio_Programado_Anual,
      });
    } catch (e) {
      console.log(e);
      e.status = 400;
      next(e);
    }
  },
};
