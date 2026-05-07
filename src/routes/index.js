// tratará toda a base Centralizando os Endpoints 

const express = require('express')
const router = express.Router()
const produoRouts = require('./ProdutoRoutes')// vai trabalhar com routs


// Verifica se o servidor está funcionando perfeitamente
router.get('/', (req,res) => {
    res.json({
        mensagem: ' Api sabor Digital',
        versao: ' 5.0.8'
    })
})

router.use('produtos', produoRouts)
router.use('/pedidos', pedidosRoutes)// tarefa
router.use('/caradapios', cardapioRoutes)

module.exports = router