const mongoose = require("../middlewares/dataBaseConfig"); //*aqui chamamos o moongoose , pelo arquivo do DB, para fazer a coneção com o banco já declarado 
const { Schema } = mongoose;

const usuarioSchema = new Schema({
  nome: String,
  cpf: Number,
  cargo: String
}, { timestamps: true });

const userModel = mongoose.model('usuarios', usuarioSchema);

module.exports = userModel;
