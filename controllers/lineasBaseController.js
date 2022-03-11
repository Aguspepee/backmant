const lineasBaseModel = require("../models/lineasBaseModel");
const mongoose = require("../bin/server");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const documents = await lineasBaseModel.find();
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
      const sap = new lineasBaseModel({
        Codigo:req.body.Codigo,
        Codigo_Tension:req.body.Codigo_Tension,
        TENS_kV:req.body.TENS_kV,
        DENOMINACION_LAT:req.body.DENOMINACION_LAT,
        Notas:req.body.Notas,
        Long_Oficial_km:req.body.Long_Oficial_km,
        Long_Planim_Km:req.body.Long_Planim_Km,
        Long_Dif_Km:req.body.Long_Dif_Km,
        Año_P_Serv:req.body.Año_P_Serv,
        S_mm2:req.body.S_mm2,
        HG_mm2:req.body.HG_mm2,
        Material_Conductor:req.body.Material_Conductor,
        Tipo_de_Estructura:req.body.Tipo_de_Estructura,
        Compartida_km:req.body.Compartida_km,
        Torres_Cantidad:req.body.Torres_Cantidad,
        Suspension_Cantidad:req.body.Suspension_Cantidad,
        Aisladores_Suspension_Cantidad:req.body.Aisladores_Suspension_Cantidad,
        Suspension_Masa:req.body.Suspension_Masa,
        Retension_Cantidad:req.body.Retension_Cantidad,
        Aisladores_Retension_Cantidad:req.body.Aisladores_Retension_Cantidad,
        Retension_Masa:req.body.Retension_Masa,
        Altura_Cond:req.body.Altura_Cond,
        Ta:req.body.Ta,
        Zona:req.body.Zona,
        Servidumbre_Urbana:req.body.Servidumbre_Urbana,
        Servidumbre_Rural:req.body.Servidumbre_Rural,
        Sale:req.body.Sale,
        Llega:req.body.Llega,
        BDE:req.body.BDE,
        IDQ:req.body.IDQ,
        Observaciones:req.body.Observaciones,
        Resistencia_Terreno:req.body.Resistencia_Terreno,
        Pot_Nat:req.body.Pot_Nat,
        Imped_Caract:req.body.Imped_Caract,
        Const_Atenuac:req.body.Const_Atenuac,
        Const_Fase:req.body.Const_Fase,
        Vel_Prop:req.body.Vel_Prop,
        R:req.body.R,
        X:req.body.X,
        B:req.body.B,
        R0:req.body.R0,
        X0:req.body.X0,
        B0:req.body.B0,
        Limite_termico:req.body.Limite_termico,
        Propietario:req.body.Propietario,
        Show:req.body.Show,
      });

      const document = await lineasBaseModel.create(req.body);
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
      const update = await lineasBaseModel.remove({});
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
          Fecha_ref_Año: { $eq: Year },
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
            Fecha_ref_Año: { $first: "$Fecha_ref_Año" },
            Fecha_ref_Mes: { $first: "$Fecha_ref_Mes" },
            Inicio_program_Año: { $first: "$Inicio_program_Año" },
            Inicio_program_Mes: { $first: "$Inicio_program_Mes" },
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
      const Inicio_Programado_Mensual = await lineasBaseModel.aggregate([
        //Stage 0 - Filter by Date
        FiltroMensualInicioProgramado,
        //Stage 1 - Filters
        FiltroFiltrosGenerales,
        //Stage 2 - Delete duplicates, based on "Ubicac_técnica".
        FiltroBorrarDuplicados,
        //Stage 3 - Make Groups of Status
        { $group: { _id: "$Status_usuario", Status: { $first: "$Status_usuario" }, Count: { $sum: 1 } } },
        { $project: { _id: 0, Status: 1, Count: 1 } }

      ]);

      const Inicio_Programado_Anual = await lineasBaseModel.aggregate([
        //Stage 0 - Filter by Date
        FiltroAnualInicioProgramado,
        //Stage 1 - Filters
        FiltroFiltrosGenerales,
        //Stage 2 - Delete duplicates, based on "Ubicac_técnica".
        FiltroBorrarDuplicados,
        //Stage 3 - Make Groups of Status
        { $group: { _id: "$Status_usuario", Status: { $first: "$Status_usuario" }, Count: { $sum: 1 } } },
        { $project: { _id: 0, Status: 1, Count: 1 } }
      ]);

      const Fecha_Referencia_Mensual = await lineasBaseModel.aggregate([
        //Stage 0 - Filter by Date
        FiltroMensualFechaReferencia,
        //Stage 1 - Filters
        FiltroFiltrosGenerales,
        //Stage 2 - Delete duplicates, based on "Ubicac_técnica".
        FiltroBorrarDuplicados,
        //Stage 3 - Make Groups of Status
        { $group: { _id: "$Status_usuario", Status: { $first: "$Status_usuario" }, Count: { $sum: 1 } } },
        { $project: { _id: 0, Status: 1, Count: 1 } }
      ]);

      const Fecha_Referencia_Anual = await lineasBaseModel.aggregate([
        //Stage 0 - Filter by Date
        FiltroAnualFechaReferencia,
        //Stage 1 - Filters
        FiltroFiltrosGenerales,
        //Stage 2 - Delete duplicates, based on "Ubicac_técnica".
        FiltroBorrarDuplicados,
        //Stage 3 - Make Groups of Status
        { $group: { _id: "$Status_usuario", Status: { $first: "$Status_usuario" }, Count: { $sum: 1 } } },
        { $project: { _id: 0, Status: 1, Count: 1 } }
      ]);

      const Fecha_Referencia_Acumulado = await lineasBaseModel.aggregate([
        //Stage 0 - Filter by Date
        FiltroAnualFechaReferencia,
        //Stage 1 - Filters
        FiltroFiltrosGenerales,
        //Stage 2 - Delete duplicates, based on "Ubicac_técnica".
        FiltroBorrarDuplicados,
        //Stage 3 - Make Groups of Status
        { $group: { _id: ["$Inicio_program_Mes"],
        Inicio_program_Mes: { $first: "$Inicio_program_Mes" }, 
        Count: { $sum: 1 } } },
        { $project : { _id : 0,  Inicio_program_Mes : 1 ,Count: 1 } },
        {$sort:{Inicio_program_Mes : 1 }}

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
        Fecha_Referencia_Mensual: Fecha_Referencia_Mensual,
        Fecha_Referencia_Anual: Fecha_Referencia_Anual,
        Fecha_Referencia_Acumulado: Fecha_Referencia_Acumulado,
      });
    } catch (e) {
      console.log(e);
      e.status = 400;
      next(e);
    }
  },
};
