const ProdutoService = require('../services/ProdutoService')

class ProdutoController{
    //GET
    async listarProduto(req,res){// respostas de sucesso e respostas de erro//NOME EM PORTUGUES
    //Sem await: Você faz o pedido ao garçom e, antes dele sair da mesa, você já tenta comer o prato (que ainda nem foi feito). Você vai "comer" o ar.
        try {
            const resultado = ProdutoService.listarProdutos()// service responsavel por listar produtos//NÃO TEM AWAIT
            // nesse caso nao é necessario mandar assim   res.status(200).json(resultado)
            res.json(resultado)
            
        } catch (erro) {
            res.status(erro.status || 500).json ({
                sucesso:false,
                mensagem: erro.mensagem || ' Erro interno do servidor',// erro que o  sistema trás ( service)
                erro: erro.stack || erro
            })
            
        }
    }
    //GET POR ID
    async buscarProdutoporId(req,res){
        try {
            const resultado = ProdutoService.listarProdutoPorId(req.params.id)// acessa o valor e manda direto para o rpoduto service
            res.json(resultado)
            
        } catch (error) {
             res.status(erro.status || 500).json ({
                sucesso:false,
                mensagem: erro.mensagem || ' Erro interno do servidor',// Mensagem não tão precisa
                erro: erro.stack || erro
            })
            
        }
    }
    // POST
    async cadastrarProduto(req,res){

        try {
            const resultado = await ProdutoService.cadastrarProduto(req.boy)
            res.json(resultado)

            
        } catch (erro) {
             res.status(erro.status || 500).json ({
                sucesso:false,
                mensagem: erro.mensagem || ' Erro interno do servidor',// erro que o  sistema trás ( service)
                erro: erro.stack || erro
            })
            
        }
    }

    //PUT
    async atualizarProduto(req,res){
        try {
            const resultado =  await ProdutoService.atualizarProduto(req.params.id, req.body)
            res.json(resultado)
            
        } catch (error) {// mesmo bloco catch para tudo
             res.status(erro.status || 500).json ({
                sucesso:false,
                mensagem: erro.mensagem || ' Erro interno do servidor',// erro que o  sistema trás ( service)
                erro: erro.stack || erro
            })
            
        }
    }
    //DELETE
    async detarProduto(req,res){
        try {
            const resultado =  await ProdutoService.deletarProduto(req.params.id)
            res.json(resultado)
        } catch (erro) {
            res.status(erro.status || 500).json ({
                sucesso:false,
                mensagem: erro.mensagem || ' Erro interno do servidor',// erro que o  sistema trás ( service)
                erro: erro.stack || erro
            })
            
        }
    }
}

module.exports =  new ProdutoController()