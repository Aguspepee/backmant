//OTG - Mantenimiento Estaciones - Generada
[
    {
      '$match': {
        'Inicio_program_Año': 22
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
  ]

  //OTG - Mantenimiento Estaciones - Cerradas
  [
    {
      '$match': {
        'Fecha_ref_Año': 22
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
  ]

  //OTG - Mantenimiento Lineas - Generadas
  [
    {
      '$match': {
        'Inicio_program_Año': 22
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
  ]

//OTG - Mantenimiento Lineas - Cerradas
[
    {
      '$match': {
        'Fecha_ref_Año': 22
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

  //OTG - Gestión de Aceites - Generada
  [
    {
      '$match': {
        'Inicio_program_Año': 22
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
  ]

  //OTG - Gestión de Aceites - Cerradas
  [
    {
      '$match': {
        'Fecha_ref_Año': 22
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
  ]