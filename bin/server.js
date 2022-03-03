const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb+srv://TranspaMantenimiento:TranspaMantenimiento123@mantenimiento.crcs7.mongodb.net/Mantenimiento?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }, function (error){
      if(error){
          throw error;
      }else{
          console.log("Conectado a MongoDB")
      }
  }
);

module.exports = mongoose
