// trabalha com o express
const express = require('express')
const router =  express.Router()// modulo dentro do express que cuida de gerenciamento de rotas
const ProdutoController = require('../controllers/ProdutoController')

// Definir o metodo http que esta sendo usado
router.get('/', ProdutoController.listarProduto)// nao é necessario mandar atributos ele entende que o rq res esta sendo mandado para listarProdutos
router.get('/:id', ProdutoController.buscarProdutoporId)
router.post('/',ProdutoController.cadastrarProduto)
router.put('/:id',ProdutoController.atualizarProduto)//PUT serve para atualizar o objeto inteiro. Se você esquecer de 
// mandar o preço,ele pode apagar o preço no banco.
router.delete('/:id',ProdutoController.detarProduto)

module.exports = router