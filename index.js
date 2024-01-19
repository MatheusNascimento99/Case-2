const express = require("express");
const userModel = require("./models/model");
const app = express();
app.use(express.json());

//*Rota GET
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await userModel.find({});
    return res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erros ao buscar usuários" });
  }
});

//*Rota POST

app.post("/usuarios", async (req, res) => {
  try {
    const usuario = await userModel.create({
      nome: req.body.nome,
      cpf: req.body.cpf,
      hierarquia: req.body.hierarquia,
    });
    return res.status(201).json([usuario]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao cadastrar novo usuário." });
  }
});

//*Conexão BD
app.listen(2525, () => {
  console.log("Servidor operacional na porta 2525 !");
});
