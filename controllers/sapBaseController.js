const sapsBaseModel = require("../models/sapsBaseModel");
const mongoose = require("../bin/server");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const documents = await sapsBaseModel.find();
      res.json(documents);
      console.log("Documentos", documents);
    } catch (e) {
      console.log(e);
      e.status = 400;
      next(e);
    }
  },

  createAll: async function (req, res, next) {
    try {
      const sap = new sapsBaseModel({
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

      const document = await sapsBaseModel.create(req.body);
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
      const update = await sapsBaseModel.remove({});
      res.json(req.params.id);
    } catch (e) {
      e.status = 400;
      next(e);
    }
  },

  filterGeneral: async function (req, res, next) {
    try {
      //Se definen los parámetros para los filtros
      let Month = Number(req.params.Month);
      let Year = Number(req.params.Year.slice(2, 4));
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
      const Inicio_Programado_Mensual = await sapsBaseModel.aggregate([
        //Stage 0 - Filter by Date
        FiltroMensualInicioProgramado,
        //Stage 1 - Filters
        FiltroFiltrosGenerales,
        //Stage 2 - Delete duplicates, based on "Ubicac_técnica".
        FiltroBorrarDuplicados,
        //Stage 3 - Make Groups of Status
        {
          $group: {
            _id: "$Status_usuario",
            Status: { $first: "$Status_usuario" },
            Count: { $sum: 1 },
          },
        },
        { $project: { _id: 0, Status: 1, Count: 1 } },
      ]);

      const Inicio_Programado_Anual = await sapsBaseModel.aggregate([
        //Stage 0 - Filter by Date
        FiltroAnualInicioProgramado,
        //Stage 1 - Filters
        FiltroFiltrosGenerales,
        //Stage 2 - Delete duplicates, based on "Ubicac_técnica".
        FiltroBorrarDuplicados,
        //Stage 3 - Make Groups of Status
        {
          $group: {
            _id: "$Status_usuario",
            Status: { $first: "$Status_usuario" },
            Count: { $sum: 1 },
          },
        },
        { $project: { _id: 0, Status: 1, Count: 1 } },
      ]);

      const Fecha_Referencia_Mensual = await sapsBaseModel.aggregate([
        //Stage 0 - Filter by Date
        FiltroMensualFechaReferencia,
        //Stage 1 - Filters
        FiltroFiltrosGenerales,
        //Stage 2 - Delete duplicates, based on "Ubicac_técnica".
        FiltroBorrarDuplicados,
        //Stage 3 - Make Groups of Status
        {
          $group: {
            _id: "$Status_usuario",
            Status: { $first: "$Status_usuario" },
            Count: { $sum: 1 },
          },
        },
        { $project: { _id: 0, Status: 1, Count: 1 } },
      ]);

      const Fecha_Referencia_Anual = await sapsBaseModel.aggregate([
        //Stage 0 - Filter by Date
        FiltroAnualFechaReferencia,
        //Stage 1 - Filters
        FiltroFiltrosGenerales,
        //Stage 2 - Delete duplicates, based on "Ubicac_técnica".
        FiltroBorrarDuplicados,
        //Stage 3 - Make Groups of Status
        {
          $group: {
            _id: "$Status_usuario",
            Status: { $first: "$Status_usuario" },
            Count: { $sum: 1 },
          },
        },
        { $project: { _id: 0, Status: 1, Count: 1 } },
      ]);

      const Inicio_Programado_Acumulado = await sapsBaseModel.aggregate([
        //Stage 0 - Filter by Date
        FiltroAnualInicioProgramado,
        //Stage 1 - Filters
        FiltroFiltrosGenerales,
        //Stage 2 - Delete duplicates, based on "Ubicac_técnica".
        FiltroBorrarDuplicados,
        //Stage 3 - Make Groups of Status
        {
          $group: {
            _id: ["$Inicio_program_Mes"],
            Inicio_program_Mes: { $first: "$Inicio_program_Mes" },
            Count: { $sum: 1 },
          },
        },
        { $project: { _id: 0, Inicio_program_Mes: 1, Count: 1 } },
        { $sort: { Inicio_program_Mes: 1 } },
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
        Inicio_Programado_Acumulado: Inicio_Programado_Acumulado,
      });
    } catch (e) {
      console.log(e);
      e.status = 400;
      next(e);
    }
  },

  distribucionHoraria: async function (req, res, next) {
    try {
      //Se definen los parámetros para los filtros
      let Month = Number(req.params.Month);
      let Year = Number(req.params.Year.slice(2, 4));
      let Grupo_planif = req.params.Grupo_planif;
      let Pto_tbjo_resp = req.params.Pto_tbjo_resp;
      if (Pto_tbjo_resp === "false") {
        Pto_tbjo_resp = "";
      }

      //-------FILTROS--------//
      //FILTRO Mensual Fecha Referencia
      let FiltroMensualFechaReferencia = {
        $match: {
          $and: [
            { Fecha_ref_Mes: { $eq: Month } },
            { Fecha_ref_Año: { $eq: Year } },
          ],
        },
      };

      //FILTRO Filtros generales
      let FiltroFiltrosGenerales = {
        $match: {
          $and: [{ Grupo_planif: { $eq: Grupo_planif } }],
        },
      };

      //Set documents by Status_usuario
      const Distribucion = await sapsBaseModel.aggregate([
        //Stage 0 - Filter by Date
        FiltroMensualFechaReferencia,
        //Stage 1 - Filters
        FiltroFiltrosGenerales,
        //Stage 3 - Make Groups of Status
        {
          $group: {
            _id: "$Grupo_Agrupamiento",
            Grupo_Agrupamiento: { $first: "$Grupo_Agrupamiento" },
            Count: { $sum: "$Trabajo_real" },
          },
        },
        { $project: { _id: 0, Grupo_Agrupamiento: 1, Count: 1 } },
      ]);
      //RESPUESTA
      res.json({
        Distribucion,
      });
    } catch (e) {
      console.log(e);
      e.status = 400;
      next(e);
    }
  },

  resumenAnual: async function (req, res, next) {
    try {
      //Se definen los parámetros para los filtros
      let Month = Number(req.params.Month);
      let Year = Number(req.params.Year.slice(2, 4));
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

      //FILTRO CTEC Cerrado Tecnicamente
      let FiltroCTEC = {
        $match: { Status_usuario: { $eq: "CTEC" } },
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

      const Fecha_Referencia_Acumulado_Total = await sapsBaseModel.aggregate([
        //Stage 0 - Filter by Date
        FiltroAnualFechaReferencia,
        //Stage 1 - Filters
        FiltroFiltrosGenerales,
        //Stage 2 - Delete duplicates, based on "Ubicac_técnica".
        FiltroBorrarDuplicados,
        //Stage 3 - Make Groups of Status
        {
          $group: {
            _id: ["$Inicio_program_Mes"],
            Inicio_program_Mes: { $first: "$Inicio_program_Mes" },
            Count: { $sum: 1 },
          },
        },
        { $project: { _id: 0, Inicio_program_Mes: 1, Count: 1 } },
        { $sort: { Inicio_program_Mes: 1 } },
      ]);

      const Fecha_Referencia_Acumulado_Ejecutado =
        await sapsBaseModel.aggregate([
          //Stage 0 - Filter by Date
          FiltroAnualFechaReferencia,
          //Stage 1 - Filters
          FiltroFiltrosGenerales,
          //Stage 2 - Delete duplicates, based on "Ubicac_técnica".
          FiltroBorrarDuplicados,
          //Stage 3 - Filtrar por ejecutados
          FiltroCTEC,
          //Stage 4 - Make Groups of Status
          {
            $group: {
              _id: ["$Inicio_program_Mes"],
              Inicio_program_Mes: { $first: "$Inicio_program_Mes" },
              Count: { $sum: 1 },
            },
          },
          { $project: { _id: 0, Inicio_program_Mes: 1, Count: 1 } },
          { $sort: { Inicio_program_Mes: 1 } },
        ]);

      //RESPUESTA
      res.json({
        Grupo_planif: Grupo_planif,
        Clase_de_orden: Clase_de_orden,
        Cl_actividad_PM: Cl_actividad_PM,
        Pto_tbjo_resp: Pto_tbjo_resp,
        Texto_breve: Texto_breve,
        Fecha_Referencia_Acumulado_Total: Fecha_Referencia_Acumulado_Total,
        Fecha_Referencia_Acumulado_Ejecutado:
          Fecha_Referencia_Acumulado_Ejecutado,
      });
    } catch (e) {
      console.log(e);
      e.status = 400;
      next(e);
    }
  },

  getResumen: async function (req, res, next) {
    try {
      const gestion_aceites_generadas = await sapsBaseModel.aggregate([
        {
          '$match': {
            'Inicio_program_Año': 23
          }
        }, {
          '$match': {
            'Operacion': {
              '$in': [
                '0010', '0009'
              ]
            }
          }
        }, {
          '$match': {
            'Cl_actividad_PM': {
              '$eq': 'MUA'
            }
          }
        }, {
          '$match': {
            'Texto_breve': {
              '$regex': 'Muest'
            }
          }
        }, {
          '$project': {
            'Grupo_planif': 1, 
            'Orden': 1, 
            'Texto_breve': 1, 
            'Inicio_program': 1, 
            'Fecha_ref': 1, 
            'Clase_de_orden': 1, 
            'Cl_actividad_PM': 1, 
            'Status_usuario': 1, 
            'Pto_tbjo_resp': 1, 
            'Trabajo_real': 1, 
            'Operacion': 1, 
            'Fecha_ref_Mes': 1, 
            'Fecha_ref_Año': 1, 
            'Inicio_program_Mes': 1, 
            'Inicio_program_Año': 1, 
            'Grupo_Agrupamiento': 1, 
            'ZN': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZN1-ETRA', 'ZN2-ETRA'
                    ]
                  ]
                }, 1, 0
              ]
            }, 
            'ZS': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZS1-ETRA', 'ZS2-ETRA'
                    ]
                  ]
                }, 1, 0
              ]
            }, 
            'ZO': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZO1-ETRA', 'ZO2-ETRA'
                    ]
                  ]
                }, 1, 0
              ]
            }, 
            'ZA': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZA1-ETRA', 'ZA2-ETRA'
                    ]
                  ]
                }, 1, 0
              ]
            }
          }
        }, {
          '$group': {
            '_id': '$Inicio_program_Mes', 
            'ZN': {
              '$sum': '$ZN'
            }, 
            'ZS': {
              '$sum': '$ZS'
            }, 
            'ZO': {
              '$sum': '$ZO'
            }, 
            'ZA': {
              '$sum': '$ZA'
            }
          }
        }, {
          '$sort': {
            '_id': 1
          }
        }
      ]);
      const gestion_aceites_cerradas = await sapsBaseModel.aggregate([
        {
          '$match': {
            'Fecha_ref_Año': 23
          }
        }, {
          '$match': {
            'Operacion': {
              '$in': [
                '0010', '0009'
              ]
            }
          }
        }, {
          '$match': {
            'Cl_actividad_PM': {
              '$eq': 'MUA'
            }
          }
        }, {
          '$match': {
            'Texto_breve': {
              '$regex': 'Muest'
            }
          }
        }, {
          '$match': {
            'Status_usuario': {
              '$regex': 'CTEC'
            }
          }
        }, {
          '$project': {
            'Grupo_planif': 1, 
            'Orden': 1, 
            'Texto_breve': 1, 
            'Inicio_program': 1, 
            'Fecha_ref': 1, 
            'Clase_de_orden': 1, 
            'Cl_actividad_PM': 1, 
            'Status_usuario': 1, 
            'Pto_tbjo_resp': 1, 
            'Trabajo_real': 1, 
            'Operacion': 1, 
            'Fecha_ref_Mes': 1, 
            'Fecha_ref_Año': 1, 
            'Inicio_program_Mes': 1, 
            'Inicio_program_Año': 1, 
            'Grupo_Agrupamiento': 1, 
            'ZN': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZN1-ETRA', 'ZN2-ETRA'
                    ]
                  ]
                }, 1, 0
              ]
            }, 
            'ZS': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZS1-ETRA', 'ZS2-ETRA'
                    ]
                  ]
                }, 1, 0
              ]
            }, 
            'ZO': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZO1-ETRA', 'ZO2-ETRA'
                    ]
                  ]
                }, 1, 0
              ]
            }, 
            'ZA': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZA1-ETRA', 'ZA2-ETRA'
                    ]
                  ]
                }, 1, 0
              ]
            }
          }
        }, {
          '$group': {
            '_id': '$Inicio_program_Mes', 
            'ZN': {
              '$sum': '$ZN'
            }, 
            'ZS': {
              '$sum': '$ZS'
            }, 
            'ZO': {
              '$sum': '$ZO'
            }, 
            'ZA': {
              '$sum': '$ZA'
            }
          }
        }, {
          '$sort': {
            '_id': 1
          }
        }
      ]);
      const mantenimiento_estaciones_generadas = await sapsBaseModel.aggregate([
        {
          '$match': {
            'Inicio_program_Año': 23
          }
        }, {
          '$match': {
            'Operacion': {
              '$in': [
                '0010', '0009'
              ]
            }
          }
        }, {
          '$match': {
            'Clase_de_orden': {
              '$nin': [
                'ZTAC', 'ZTST'
              ]
            }
          }
        }, {
          '$match': {
            'Cl_actividad_PM': {
              '$ne': 'MUA'
            }
          }
        }, {
          '$match': {
            'Texto_breve': {
              '$not': {
                '$regex': 'Muest'
              }
            }
          }
        }, {
          '$match': {
            'Texto_breve': {
              '$not': {
                '$regex': 'R. die'
              }
            }
          }
        }, {
          '$project': {
            'Grupo_planif': 1, 
            'Orden': 1, 
            'Texto_breve': 1, 
            'Inicio_program': 1, 
            'Fecha_ref': 1, 
            'Clase_de_orden': 1, 
            'Cl_actividad_PM': 1, 
            'Status_usuario': 1, 
            'Pto_tbjo_resp': 1, 
            'Trabajo_real': 1, 
            'Operacion': 1, 
            'Fecha_ref_Mes': 1, 
            'Fecha_ref_Año': 1, 
            'Inicio_program_Mes': 1, 
            'Inicio_program_Año': 1, 
            'Grupo_Agrupamiento': 1, 
            'ZN': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZN1-ETRA', 'ZN2-ETRA'
                    ]
                  ]
                }, 1, 0
              ]
            }, 
            'ZS': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZS1-ETRA', 'ZS2-ETRA'
                    ]
                  ]
                }, 1, 0
              ]
            }, 
            'ZO': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZO1-ETRA', 'ZO2-ETRA'
                    ]
                  ]
                }, 1, 0
              ]
            }, 
            'ZA': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZA1-ETRA', 'ZA2-ETRA'
                    ]
                  ]
                }, 1, 0
              ]
            }
          }
        }, {
          '$group': {
            '_id': '$Inicio_program_Mes', 
            'ZN': {
              '$sum': '$ZN'
            }, 
            'ZS': {
              '$sum': '$ZS'
            }, 
            'ZO': {
              '$sum': '$ZO'
            }, 
            'ZA': {
              '$sum': '$ZA'
            }
          }
        }, {
          '$sort': {
            '_id': 1
          }
        }
      ]);
      const mantenimiento_estaciones_cerradas = await sapsBaseModel.aggregate([
        {
          '$match': {
            'Fecha_ref_Año': 23
          }
        }, {
          '$match': {
            'Operacion': {
              '$in': [
                '0010', '0009'
              ]
            }
          }
        }, {
          '$match': {
            'Clase_de_orden': {
              '$nin': [
                'ZTAC', 'ZTST'
              ]
            }
          }
        }, {
          '$match': {
            'Status_usuario': {
              '$regex': 'CTEC'
            }
          }
        }, {
          '$match': {
            'Cl_actividad_PM': {
              '$ne': 'MUA'
            }
          }
        }, {
          '$match': {
            'Texto_breve': {
              '$not': {
                '$regex': 'Muest'
              }
            }
          }
        }, {
          '$match': {
            'Texto_breve': {
              '$not': {
                '$regex': 'R. die'
              }
            }
          }
        }, {
          '$project': {
            'Grupo_planif': 1, 
            'Orden': 1, 
            'Texto_breve': 1, 
            'Inicio_program': 1, 
            'Fecha_ref': 1, 
            'Clase_de_orden': 1, 
            'Cl_actividad_PM': 1, 
            'Status_usuario': 1, 
            'Pto_tbjo_resp': 1, 
            'Trabajo_real': 1, 
            'Operacion': 1, 
            'Fecha_ref_Mes': 1, 
            'Fecha_ref_Año': 1, 
            'Inicio_program_Mes': 1, 
            'Inicio_program_Año': 1, 
            'Grupo_Agrupamiento': 1, 
            'ZN': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZN1-ETRA', 'ZN2-ETRA'
                    ]
                  ]
                }, 1, 0
              ]
            }, 
            'ZS': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZS1-ETRA', 'ZS2-ETRA'
                    ]
                  ]
                }, 1, 0
              ]
            }, 
            'ZO': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZO1-ETRA', 'ZO2-ETRA'
                    ]
                  ]
                }, 1, 0
              ]
            }, 
            'ZA': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZA1-ETRA', 'ZA2-ETRA'
                    ]
                  ]
                }, 1, 0
              ]
            }
          }
        }, {
          '$group': {
            '_id': '$Fecha_ref_Mes', 
            'ZN': {
              '$sum': '$ZN'
            }, 
            'ZS': {
              '$sum': '$ZS'
            }, 
            'ZO': {
              '$sum': '$ZO'
            }, 
            'ZA': {
              '$sum': '$ZA'
            }
          }
        }, {
          '$sort': {
            '_id': 1
          }
        }
      ]);
      const mantenimiento_lineas_generadas = await sapsBaseModel.aggregate([
        {
          '$match': {
            'Inicio_program_Año': 23
          }
        }, {
          '$match': {
            'Operacion': {
              '$in': [
                '0010', '0009'
              ]
            }
          }
        }, {
          '$match': {
            'Clase_de_orden': {
              '$nin': [
                'ZTAC', 'ZTST'
              ]
            }
          }
        }, {
          '$project': {
            'Grupo_planif': 1, 
            'Orden': 1, 
            'Texto_breve': 1, 
            'Inicio_program': 1, 
            'Fecha_ref': 1, 
            'Clase_de_orden': 1, 
            'Cl_actividad_PM': 1, 
            'Status_usuario': 1, 
            'Pto_tbjo_resp': 1, 
            'Trabajo_real': 1, 
            'Operacion': 1, 
            'Fecha_ref_Mes': 1, 
            'Fecha_ref_Año': 1, 
            'Inicio_program_Mes': 1, 
            'Inicio_program_Año': 1, 
            'Grupo_Agrupamiento': 1, 
            'ZN': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZN1-LATS'
                    ]
                  ]
                }, 1, 0
              ]
            }, 
            'ZS': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZS1-LATS'
                    ]
                  ]
                }, 1, 0
              ]
            }, 
            'ZO': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZO1-LATS'
                    ]
                  ]
                }, 1, 0
              ]
            }, 
            'ZA': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZA1-LATS'
                    ]
                  ]
                }, 1, 0
              ]
            }
          }
        }, {
          '$group': {
            '_id': '$Inicio_program_Mes', 
            'ZN': {
              '$sum': '$ZN'
            }, 
            'ZS': {
              '$sum': '$ZS'
            }, 
            'ZO': {
              '$sum': '$ZO'
            }, 
            'ZA': {
              '$sum': '$ZA'
            }
          }
        }, {
          '$sort': {
            '_id': 1
          }
        }
      ]);
      const mantenimiento_lineas_cerradas = await sapsBaseModel.aggregate([
        {
          '$match': {
            'Fecha_ref_Año': 23
          }
        }, {
          '$match': {
            'Operacion': {
              '$in': [
                '0010', '0009'
              ]
            }
          }
        }, {
          '$match': {
            'Clase_de_orden': {
              '$nin': [
                'ZTAC', 'ZTST'
              ]
            }
          }
        }, {
          '$match': {
            'Status_usuario': {
              '$regex': 'CTEC'
            }
          }
        }, {
          '$project': {
            'Grupo_planif': 1, 
            'Orden': 1, 
            'Texto_breve': 1, 
            'Inicio_program': 1, 
            'Fecha_ref': 1, 
            'Clase_de_orden': 1, 
            'Cl_actividad_PM': 1, 
            'Status_usuario': 1, 
            'Pto_tbjo_resp': 1, 
            'Trabajo_real': 1, 
            'Operacion': 1, 
            'Fecha_ref_Mes': 1, 
            'Fecha_ref_Año': 1, 
            'Inicio_program_Mes': 1, 
            'Inicio_program_Año': 1, 
            'Grupo_Agrupamiento': 1, 
            'ZN': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZN1-LATS'
                    ]
                  ]
                }, 1, 0
              ]
            }, 
            'ZS': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZS1-LATS'
                    ]
                  ]
                }, 1, 0
              ]
            }, 
            'ZO': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZO1-LATS'
                    ]
                  ]
                }, 1, 0
              ]
            }, 
            'ZA': {
              '$cond': [
                {
                  '$in': [
                    '$Pto_tbjo_resp', [
                      'ZA1-LATS'
                    ]
                  ]
                }, 1, 0
              ]
            }
          }
        }, {
          '$group': {
            '_id': '$Fecha_ref_Mes', 
            'ZN': {
              '$sum': '$ZN'
            }, 
            'ZS': {
              '$sum': '$ZS'
            }, 
            'ZO': {
              '$sum': '$ZO'
            }, 
            'ZA': {
              '$sum': '$ZA'
            }
          }
        }, {
          '$sort': {
            '_id': 1
          }
        }
      ]
    );

      //RESPUESTA
      res.json({
        gestion_aceites_generadas: gestion_aceites_generadas,
        gestion_aceites_cerradas: gestion_aceites_cerradas,
        mantenimiento_estaciones_generadas: mantenimiento_estaciones_generadas,
        mantenimiento_estaciones_cerradas: mantenimiento_estaciones_cerradas,
        mantenimiento_lineas_generadas: mantenimiento_lineas_generadas,
        mantenimiento_lineas_cerradas: mantenimiento_lineas_cerradas,
      });
    } catch (e) {
      console.log(e);
      e.status = 400;
      next(e);
    }
  },
};
