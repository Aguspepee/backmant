const sapsModel = require("../models/sapsModel")

module.exports = {
    getAll:async function (req,res,next){
        try{
            const documents = await sapsModel.find()
            res.json(documents)
            console.log("Documentos",documents)
        }catch(e){
            console.log(e)
            e.status = 400
            next(e)
        }
    },

    create:async function (req,res,next){
        try{
            console.log("Id", req.body.userId)
            const sap = new sapsModel({
                
                    Orden: req.body.Orden,
                    Equipo: req.body.Equipo,
                    Ubicac_técnica:req.body.Ubicac_técnica,
                    Texto_breve: req.body.Texto_breve,
                    Inicio_program: req.body.Inicio_program,
                    Fecha_ref: req.body.Fecha_ref,
                    Grupo_planif: req.body.Grupo_planif,
                    Clase_de_orden:req.body.Clase_de_orden,
                    Cl_actividad_PM: req.body.Cl_actividad_PM,
                    Status_usuario:req.body.Status_usuario,
                    Pto_tbjo_resp: req.body.Pto_tbjo_resp,
                    Trabajo_real: req.body.Trabajo_real,
                    Operacion: req.bodyOperación
                   
            })
            const document = await sap.save()
            console.log("se creo",document)
            res.json(document)

        }catch(e){
            console.log(e)
            e.status = 400
            next(e)
        }
    }
}