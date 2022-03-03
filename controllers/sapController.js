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
                name: req.body.name
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