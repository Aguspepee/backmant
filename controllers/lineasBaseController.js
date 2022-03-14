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
        Codigo: req.body.Codigo,
        Codigo_Tension: req.body.Codigo_Tension,
        TENS_kV: req.body.TENS_kV,
        DENOMINACION_LAT: req.body.DENOMINACION_LAT,
        Notas: req.body.Notas,
        Long_Oficial_km: req.body.Long_Oficial_km,
        Long_Planim_Km: req.body.Long_Planim_Km,
        Long_Dif_Km: req.body.Long_Dif_Km,
        Año_P_Serv: req.body.Año_P_Serv,
        S_mm2: req.body.S_mm2,
        HG_mm2: req.body.HG_mm2,
        Material_Conductor: req.body.Material_Conductor,
        Tipo_de_Estructura: req.body.Tipo_de_Estructura,
        Compartida_km: req.body.Compartida_km,
        Torres_Cantidad: req.body.Torres_Cantidad,
        Suspension_Cantidad: req.body.Suspension_Cantidad,
        Aisladores_Suspension_Cantidad: req.body.Aisladores_Suspension_Cantidad,
        Suspension_Masa: req.body.Suspension_Masa,
        Retension_Cantidad: req.body.Retension_Cantidad,
        Aisladores_Retension_Cantidad: req.body.Aisladores_Retension_Cantidad,
        Retension_Masa: req.body.Retension_Masa,
        Altura_Cond: req.body.Altura_Cond,
        Ta: req.body.Ta,
        Zona: req.body.Zona,
        Servidumbre_Urbana: req.body.Servidumbre_Urbana,
        Servidumbre_Rural: req.body.Servidumbre_Rural,
        Sale: req.body.Sale,
        Llega: req.body.Llega,
        BDE: req.body.BDE,
        IDQ: req.body.IDQ,
        Observaciones: req.body.Observaciones,
        Resistencia_Terreno: req.body.Resistencia_Terreno,
        Pot_Nat: req.body.Pot_Nat,
        Imped_Caract: req.body.Imped_Caract,
        Const_Atenuac: req.body.Const_Atenuac,
        Const_Fase: req.body.Const_Fase,
        Vel_Prop: req.body.Vel_Prop,
        R: req.body.R,
        X: req.body.X,
        B: req.body.B,
        R0: req.body.R0,
        X0: req.body.X0,
        B0: req.body.B0,
        Limite_termico: req.body.Limite_termico,
        Propietario: req.body.Propietario,
        Show: req.body.Show,
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

  NovedadesResumen: async function (req, res, next) {
    let Month = req.params.Month;
    let Year = req.params.Year;
    let Grupo_planif = req.params.Grupo_planif;
    let Tipo = req.params.Tipo;
    try {
      //Set documents by Status_usuario
      const Lineas_Mensual = await lineasBaseModel.aggregate([
        {
          $match: {
            Zona: Grupo_planif,
          },
        },
        {
          $lookup: {
            from: "lineas_novedades",
            localField: "Clave_Interna",
            foreignField: "Codigo_Interno",
            as: "Historial",
          },
        },
        {
          $project: {
            _id: 0,
            Codigo_Tension: 1,
            Codigo: 1,
            Clave_Interna: 1,
            Zona: 1,
            Torres_Cantidad: 1,
            Historial: {
              $filter: {
                input: "$Historial",
                as: "hola",
                cond: {
                  $and: [
                    {
                      $eq: ["$$hola.Fecha_Mes", Month],
                    },
                    {
                      $eq: ["$$hola.Fecha_Año", Year],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $unwind: {
            path: "$Historial",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            Codigo_Completo: {
              $concat: ["$Codigo_Tension", "$Clave_Interna"],
            },
            Zona: 1,
            Torres_Cantidad: 1,
            Codigo_valorac: "$Historial.Codigo_valorac",
            Inspeccionada: {
              $cond: [
                {
                  $eq: ["$Historial.Codigo_valorac", Tipo],
                },
                1,
                0,
              ],
            },
          },
        },
        {
          $group: {
            _id: "$Codigo_Completo",
            Codigo_Completo: {
              $first: "$Codigo_Completo",
            },
            Torres_Cantidad: {
              $first: "$Torres_Cantidad",
            },
            Torres_Inspeccionadas: {
              $sum: "$Inspeccionada",
            },
          },
        },
        {
          $group: {
            _id: {},
            Torres_Cantidad: {
              $sum: "$Torres_Cantidad",
            },
            Torres_Inspeccionadas: {
              $sum: "$Torres_Inspeccionadas",
            },
          },
        },
        {
          $project: {
            _id: 0,
            Codigo_Completo: 1,
            Torres_Cantidad: 1,
            Torres_Inspeccionadas: 1,
          },
        },
        {
          $sort: {
            Codigo_Completo: 1,
          },
        },
      ]);
      const Lineas_Anual = await lineasBaseModel.aggregate([
        {
          $match: {
            Zona: Grupo_planif,
          },
        },
        {
          $lookup: {
            from: "lineas_novedades",
            localField: "Clave_Interna",
            foreignField: "Codigo_Interno",
            as: "Historial",
          },
        },
        {
          $project: {
            _id: 0,
            Codigo_Tension: 1,
            Codigo: 1,
            Clave_Interna: 1,
            Zona: 1,
            Torres_Cantidad: 1,
            Historial: {
              $filter: {
                input: "$Historial",
                as: "hola",
                cond: {
                  $eq: ["$$hola.Fecha_Año", Year],
                },
              },
            },
          },
        },
        {
          $unwind: {
            path: "$Historial",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            Codigo_Completo: {
              $concat: ["$Codigo_Tension", "$Clave_Interna"],
            },
            Zona: 1,
            Torres_Cantidad: 1,
            Codigo_valorac: "$Historial.Codigo_valorac",
            Inspeccionada: {
              $cond: [
                {
                  $eq: ["$Historial.Codigo_valorac", Tipo],
                },
                1,
                0,
              ],
            },
          },
        },
        {
          $group: {
            _id: "$Codigo_Completo",
            Codigo_Completo: {
              $first: "$Codigo_Completo",
            },
            Torres_Cantidad: {
              $first: "$Torres_Cantidad",
            },
            Torres_Inspeccionadas: {
              $sum: "$Inspeccionada",
            },
          },
        },
        {
          $group: {
            _id: {},
            Torres_Cantidad: {
              $sum: "$Torres_Cantidad",
            },
            Torres_Inspeccionadas: {
              $sum: "$Torres_Inspeccionadas",
            },
          },
        },
        {
          $project: {
            _id: 0,
            Codigo_Completo: 1,
            Torres_Cantidad: 1,
            Torres_Inspeccionadas: 1,
          },
        },
        {
          $sort: {
            Codigo_Completo: 1,
          },
        },
      ]);

      let Total_Anual_Previsto;
      let Total_Mensual_Previsto;
      if (Tipo === "PINM") {
        Total_Anual_Previsto = Lineas_Anual[0].Torres_Cantidad * 0.5;
        Total_Mensual_Previsto = (Lineas_Anual[0].Torres_Cantidad * 0.5) / 12;
      } else if (Tipo === "PINT") {
        Total_Anual_Previsto = Lineas_Anual[0].Torres_Cantidad * 2;
        Total_Mensual_Previsto = (Lineas_Anual[0].Torres_Cantidad * 2) / 12;
      }

      //RESPUESTA
      res.json({
        Total_Anual_Previsto: Total_Anual_Previsto,
        Total_Anual_Ejecutado: Lineas_Anual[0].Torres_Inspeccionadas,
        Total_Mensual_Previsto: Total_Mensual_Previsto,
        Total_Mensual_Ejecutado: Lineas_Mensual[0].Torres_Inspeccionadas,
      });
    } catch (e) {
      console.log(e);
      e.status = 400;
      next(e);
    }
  },

  NovedadesDetalle: async function (req, res, next) {
    let Month = req.params.Month;
    let Year = req.params.Year;
    let Grupo_planif = req.params.Grupo_planif;
    let Tipo = req.params.Tipo;
    try {
      //Set documents by Status_usuario
      const Lineas = await lineasBaseModel.aggregate([
        {
          $match: {
            Zona: Grupo_planif,
          },
        },
        {
          $match: {
            Show: "true",
          },
        },
        {
          $lookup: {
            from: "lineas_novedades",
            localField: "Clave_Interna",
            foreignField: "Codigo_Interno",
            as: "Historial",
          },
        },
        {
          $project: {
            _id: 0,
            Codigo_Tension: 1,
            Codigo: 1,
            Clave_Interna: 1,
            Zona: 1,
            Torres_Cantidad: 1,
            Historial: {
              $filter: {
                input: "$Historial",
                as: "hola",
                cond: {
                  $eq: ["$$hola.Fecha_Año", Year],
                },
              },
            },
          },
        },
        {
          $unwind: {
            path: "$Historial",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            Codigo_Completo: {
              $concat: ["$Codigo_Tension", "$Clave_Interna"],
            },
            Zona: 1,
            Torres_Cantidad: 1,
            Codigo_valorac: "$Historial.Codigo_valorac",
            Inspeccionada: {
              $cond: [
                {
                  $eq: ["$Historial.Codigo_valorac", Tipo],
                },
                1,
                0,
              ],
            },
          },
        },
        {
          $group: {
            _id: "$Codigo_Completo",
            Codigo_Completo: {
              $first: "$Codigo_Completo",
            },
            Torres_Cantidad: {
              $first: "$Torres_Cantidad",
            },
            Torres_Inspeccionadas: {
              $sum: "$Inspeccionada",
            },
          },
        },
        {
          $project: {
            _id: 0,
            Codigo_Completo: 1,
            Torres_Cantidad: 1,
            Torres_Inspeccionadas: 1,
          },
        },
        {
          $sort: {
            Codigo_Completo: 1,
          },
        },
      ]);
      //RESPUESTA
      res.json({
        Lineas,
      });
    } catch (e) {
      console.log(e);
      e.status = 400;
      next(e);
    }
  },
};
