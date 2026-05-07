const express = require("express");
// const pool = require("./config/database");// NAO FAZ MAIS PARTE 

const app = express(); //cria uma aplicação web
app.use(express.json()); //servidor interpreta requisição JSON

const routes = require('./routes')// procurar o index.js
app.use('/',routes)

module.exports = app




//________________________________________________________😋💻________________________________________________________________//


// APP NAO ACESSA MAIS O BANCO  QUEM ACESSA É O REPOSITORY

// const queryAsync = (sql, values = []) => {
//   // async  tranforma a função em assincrona
//   return new Promise((resolve, reject) => {
//     //retornar o resultado da promesa
//     pool.query(sql, values, (err, results) => {
//       if (err) reject(err);
//       else resolve(results);
//     });
//   });
// };

// app.get("/", (req, res) => {
//   // Testar se a api está ativa
//   res.send("API SaborDigital");
// });

// app.get("/produtos", async (req, res) => {
//   try {
//     const produtos = await queryAsync("SELECT * FROM produto ORDER BY id DESC");
//     res.json({
//       sucesso: true,
//       dados: produtos,
//       total: produtos.length,
//     });
//   } catch (erro) {
//     //executado apenas se um erro ocorrerno  no try
//     console.log("Erro ao listar produtos:", erro);
//     res.status(500).json({
//       sucesso: false,
//       mensagem: " Erro ao listar produtos",
//       erro: erro.message,
//     });
//   }
//   {
//   }
// });

// app.get("/produtos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!id || isNaN(id)) {
//       // isNan é not a number
//       return res.status(400).json({
//         sucesso: false,
//         mensagem: " ID de produto é inválido",
//       });
//     }
//     const produto = await queryAsync("Select * From produto WHERE id = ?", [
//       id,
//     ]);

//     if (produto.length === 0) {
//       return res.status(404).json({
//         sucesso: false,
//         mensagem: "Produto nao encontrado",
//       });
//     }
//     res.json({
//       sucesso: true,
//       dados: produto[0],
//     });
//   } catch (erro) {
//     console.log("Erro ao encontrar produto:", erro);
//     res.status(500).json({
//       sucesso: false,
//       mensagem: " Erro ao encontrar produtos",
//       erro: erro.message,
//     });
//   }
// });

// app.post("/produtos", async (req, res) => {
//   try {
//     const { nome, descricao, disponivel, preco } = req.body;

//     if (!nome || !descricao || !disponivel || !preco) {
//       return res.status(400).json({
//         sucesso: false,
//         mensagem: "O nome, descricao e preco são obrigatórios",
//       });
//     }

//     if (typeof preco !== "number" || preco <= 0) {
//       return res.status(400).json({
//         sucesso: false,
//         mensagem: "Preco deve ser um número positivo.",
//       });
//     }

//     if (typeof disponivel !== "boolean") {
//       return res.status(400).json({
//         sucesso: false,
//         mensagem: "Disponivel deve ser verdadeiro ou falso",
//       });
//     }

//     const novoProduto = {
//       nome: nome.trim(),
//       descricao: descricao.trim(),
//       preco,
//       disponivel: disponivel,
//     };

//     const resultado = await queryAsync("INSERT INTO produto SET ?", [
//       novoProduto,
//     ]); //tentativa de salvar no banco de dados

//     res.status(201).json({
//       sucesso: true,
//       mensagem: "Produto cadastrado com sucesso.",
//       id: resultado.insertId,
//     });
//   } catch (erro) {
//     console.error("Erro ao salvar produto:", erro);
//     res.status(500).json({
//       sucesso: false,
//       mensagem: "Erro ao salvar produto.",
//       erro: erro.message,
//     });
//   }
// });

// app.put("/produtos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { nome, descricao, disponivel, preco } = req.body;

//     if (!id || isNaN(id)) {
//       return res.status(400).json({
//         sucesso: false,
//         mensagem: "ID produto inválido.",
//       });
//     }

//     const produtoExistente = await queryAsync(
//       "SELECT * FROM produto WHERE id = ?",
//       [id],
//     );

//     if (produtoExistente.length === 0) {
//       return res.status(404).json({
//         // 404 quando nao localiza uma informação
//         sucesso: false,
//         mensagem: "Produto não encontrado.",
//       });
//     }

//     const produtoAtualizado = {};

//     if (nome !== undefined) produtoAtualizado.nome = nome.trim();
//     if (descricao !== undefined) produtoAtualizado.descricao = descricao.trim();
//     if (preco !== undefined) {
//       if (typeof preco !== "number" || preco <= 0) {
//         return res.status(400).json({
//           sucesso: false,
//           mensagem: "Preco deve ser um número positivo.",
//         });
//       }
//       produtoAtualizado.preco = preco;
//     }
//     if (disponivel !== undefined) produtoAtualizado.disponivel = disponivel;

//     if (Object.keys(produtoAtualizado).length === 0) {
//       // analiza todos os objetos presentes no java
//       return res.status(400).json({
//         sucesso: false,
//         mensagem: "Nenhum campo para atualizar",
//       });
//     }

//     await queryAsync("UPDATE produto SET ? WHERE id = ?", [
//       produtoAtualizado,
//       id,
//     ]);
//     res.json({
//       sucesso: true,
//       mensagem: "Produto atualizado.",
//     });
//   } catch (erro) {
//     console.error("Erro ao atualizar produto:", erro);
//     res.status(500).json({
//       sucesso: false,
//       mensagem: "Erro ao atualizar produto.",
//       erro: erro.message,
//     });
//   }
// });

// app.delete("/produtos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!id || isNaN(id)) {
//       return res.status(400).json({
//         sucesso: false,
//         mensagem: "ID produto inválido.",
//       });
//     }

//     const produtoExistente = await queryAsync(
//       "SELECT * FROM produto WHERE id = ?",
//       [id],
//     );

//     if (produtoExistente.length === 0) {
//       return res.status(404).json({
//         sucesso: false,
//         mensagem: "Produto não encontrado.",
//       });
//     }

//     await queryAsync("DELETE FROM produto WHERE id = ?", [id]);

//     res.status(200).json({
//       sucesso: true,
//       mensagem: "Produto apagado",
//     });
//   } catch (erro) {
//     console.error("Erro ao apagar produo:", erro);
//     res.status(500).json({
//       sucesso: false,
//       mensagem: "Erro ao apagar produto.",
//       erro: erro.message,
//     });
//   }
// });

// module.exports = app;
