const express = require("express");
const userModel = require("./models/model");
const app = express();
app.use(express.json());

//*Rota GET Buscar Usuários
app.get("/usuarios", async (_, res) => {
  try {
    const usuarios = await userModel.find({});

    if (usuarios.length === 0) {
      return res
        .status(400)
        .json("Ainda não há informações de usuários cadastradas na base.");
    }

    return res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Erros ao buscar usuários" });
  }
});

//!Rota GET ID Buscar Usuários por Id
app.get("/usuarios/:id", async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const retornoBancoDados = await userModel.findById({ _id: usuarioId }); //!retornoBancoDados busca o param (_id)que esta dentro de BD
    if (retornoBancoDados === null || retornoBancoDados === undefined) {
      return res.status(400).json("Usuário não encontrado na base.");
    }
    return res.status(200).json(retornoBancoDados);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Usuário não encontrado." });
  }
});

//*Rota POST Criar Usuários
app.post("/usuarios", async (req, res) => {
  try {
    const { cpf } = req.body;

    const usuarioExistente = await userModel.findOne({ cpf });
    if (usuarioExistente) {
      return res
        .status(400)
        .json({ error: "Cpf já cadastrado na base de dados." });
    }
    const usuario = await userModel.create({
      nome: req.body.nome,
      cpf: req.body.cpf,
      hierarquia: req.body.hierarquia,
    });
    return res.status(201).json(["Usuário criado com sucesso!", usuario]);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Erro ao cadastrar novo usuário." });
  }
});

//!Rota PUT Atualizar Usuários
app.put("/usuarios/:id", async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const usuarioExistente = await userModel.findById({ _id: usuarioId });

    if (!usuarioExistente) {
      return res.status(404).json({ error: "Usuário não encontrado na base." });
    }
    const usuarioDados = ({ nome, cpf, hierarquia } = req.body);
    const retornoBancoDados = await userModel.updateOne(
      { _id: usuarioId },
      { nome, cpf, hierarquia }
    );
    return res
      .status(200)
      .json([
        "Usuário atualizado com sucesso!",
        retornoBancoDados,
        usuarioDados,
      ]);
  } catch (error) {
    return res.status(404).json({ error: "Erro na atualização de usuário." });
  }
});

//*Rota Delete Apagar Usuários
app.delete("/usuarios/:id", async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const usuarioExistente = await userModel.findById({ _id: usuarioId });

    if (!usuarioExistente) {
      return res.status(404).json({ error: "Usuário não encontrado na base." });
    }

    const retornoBancoDados = await userModel.deleteOne({ _id: usuarioId });
    return res
      .status(200)
      .json(["Usuário apagado com sucesso!", retornoBancoDados]);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao apagar usuário." });
  }
});

//!Conexão BD
app.listen(2525, () => {
  console.log("Servidor operacional na porta 2525 !");
});
