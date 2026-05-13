// ACESSA O BANCO
// Faz apenas um SELECT *. Ele traz apenas os dados básicos daquela linha da tabela.
// Ele grava a informação de uma vez e, se der erro, não tem como voltar atrás automaticamente.

const pool = require('../config/database')

class ProdutoRepository{
    async listarProdutos(){
        const listaProdutos = await pool.query ('SELECT * FROM produto')//Pega o pacote fechado
        return listaProdutos
    }

    async buscarProdutoPorId(id){
const mostrarProduto = await pool.query('SELECT * FROM  produto WHERE id = ?',[id])
return mostrarProduto[0]
    }
    async cadastrarProduto(dadosDoProduto){
         const resultadoCadastro = await pool.query('INSERT INTO produto SET ?',[dadosDoProduto])
         return resultadoCadastro.insertId

    }
    // async atualizarProduto (id, dadosDoProduto){
    //     // const produtoAtualizado = await pool.query("UPDATE produto SET ? WHERE id = ?" [dadosDoProduto, id])// atualizar tudo mais pode gerar erro quando quer atualizar só um

    //     // return produtoAtualizado

    // }

    async atualizarProduto (id, dadosDoProduto){// quando quer atualizar um produto especifico
        const camposProdutos= []
        const values =[]

        for(const[key,value] of Object.entries (dadosDoProduto)){// vai separar nome:Monique nome vai em campos produto e Monique vai em values
            camposProdutos.push(`${key} = ?`)// push adiciona no ultimo campo do ARRAY
            dadosDoProduto.push(value)

        }
        if(camposProdutos.length === 0) return null
        dadosDoProduto.push(id)

        const query = `UPDATE produto SET $ {camposDoProduto.join(',)} WHERE id = ?`// significa que quer separar eles por virgula

        const resultado = await pool.query(query,dadosDoProduto)
        return resultado.affectedRows// verifica quantas linhas do banco foram realmente afetadas pela atualização.
    }

    async apagarProduto (id){
        await pool.query('DELETE FROM produto WHERE id = ?', [id]) 

        return true 
    }
}

module.exports =  new ProdutoRepository()