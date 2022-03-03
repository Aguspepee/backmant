const mongoose = require("../bin/server");

//Schema
const sapsShema = mongoose.Schema({
  name: { type: String },
});

module.exports = mongoose.model("saps", sapsShema)
