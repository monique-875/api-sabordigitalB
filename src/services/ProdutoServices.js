//CRUD Simples. Ele apenas repassa a ordem para o banco. 
// Se você pede para cadastrar, ele manda cadastrar. Ele não "pensa" sobre os dados.
//So conversa com ProdutoRepository
//Não gera mensagens próprias. Se der erro, o sistema apenas "quebra" ou manda o erro padrão do banco.

const ProdutoRepository = require('../repositories/ProdutoRepository')

class ProdutoService{

    listarProdutos(){
        const produtos = await ProdutoRepository.listarProdutos()
        return{
            secesso: true,
            dados: produtos,
            total: produtos.length
        }
    }
    async buscarProdutoPorId(id){
        if (!id || isNaN(id)){
            throw{status: 400,// devolve erros para todas as validaçoes do try e catch
                mensagem:' Id invalido'
            }           
        }

        const produto = await ProdutoRepository.buscarProdutoPorId(id)

        if(!produto){
            throw{
                status:404,
                mensagem: ' Produto nao encontrado'
            }
        }

        return{
            sucesso:true,
            dados: produto[0]
        }
    }
    async cadastrarProduto(dados){
        const {nome,descricao, preco, categoria, disponivel} = dados
        // ver se os obrigatorios estao definidos e se preço é numero
        if(!nome || ! descricao || !preco === undefined){
            // se os dados nao forem preencidos entra dentro da throw
            throw{
                status: 400,
                mensagem: 'Nome , descricao e preco são obrigatorios'
            }
        }
        // if de preco verificando se ele é um numero positivo
        if(typeof preco !== 'number' || preco<= 0){
            throw{
                status: 400,
                mensagem: ' Preco deve ser positivo'
            }
        }

        // criaçao de um novo produto na repository 
        const novoProduto = {
            nome: nome.trim(),
            descricao: descricao.trim(),//. trim para retirar os espaços é uma alteração
            preco,// é o preco que ta na repository sem modificaçoes
            categoria: categoria || null,// nao é predefinido (ele nao possui espaços)  se ele nao for definido ele entra como null
            disponivel: disponivel || true
        }
        // cadastrar no banco de dados

        const resultado = await ProdutoRepository.cadastrarProduto(dados)

        return{
            sucesso: true,
            mensagem:' Produto cadastrado com sucesso',
            resultado // retornar o insertid
        }
    
    }
    async atualizarProduto(id, dados){
        if(! id || isNaN(id)){// verificando se o id esta vazio ou se ele nao for numero
            throw{
                status: 400,
                mensagem: ' id inválido'
            }

        }
        // Buscar id no banco e verificar se ele existe
        const produtoId = await ProdutoRepository.buscarProdutoPorId(id)
        if(!produtoId){// verificar se ele é igual a 0 ou nulo ! ou // ou if(produtoId.lenght === 0){}
        throw{
            status: 404,
            mensagem: 'Produto não encotrado'
        }
    }
    
        const produtoAtualizado = {}

        const {nome, descricao, preco,  categoria , disponivel} = dados

        // || nome.trim() !== '' ele nao permite que o usuario envie espaço em branco ou && nome.trim().lenght>0 se tiver pelo menos um caracter

        if(nome !== undefined || nome.trim() !== '') produtoAtualizado.nome =nome.trim()// nome que acabou de criar la encima ele vai ser undifined se ele for diferente de undfined ele  nao foi preenchido

        if(descricao !==undefined)produtoAtualizado.descricao = descricao.trim()
        if(preco!== undefined){
            if(typeof preco !== ' number' || preco <= 0){
                throw{
                    status:400,
                    mensagem: 'Preco deve ser um numero positivo'
                }
            } // esse if é so para validacao
            //  se isso nao for igual a 0 entra em uma essecao
            produtoAtualizado.preco = preco // atualizar o preco
        }
        if(categoria !== undefined) produtoAtualizado.categoria = categoria
        if(disponivel !== undefined)produtoAtualizado.disponivel = disponivel

        if(Object.keys(produtoAtualizado).length === 0){// se nenhum dado for atualizado
            throw{
                status: 400,
                mensagem: 'Nenhum dado valido enviado para atualização'
            }
        }
         await ProdutoRepository.atualizarProduto(id, produtoAtualizado)
         return{
            sucesso: true,
            mensagem: ' Produto atualizado'
         }

        }
        async deletarProduto(id){
            if(!id || isNaN(id)){
                throw{
                status:400,
                mensagem:' id invalido'
                }
            }
            const idProduto = await ProdutoRepository.buscarProdutoPorId(id)

            if(!idProduto){
                throw{
                    status: 404,
                    mensagem: ' Produto não encontado'
                }
            }
            await ProdutoRepository.apagarProduto(id)
            return{
                sucesso: true,
                mensagem: ' Produto apagado'
            }
        }
 

    }
    
module.exports =  new ProdutoService()