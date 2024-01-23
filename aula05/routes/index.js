var express = require('express');
var router = express.Router();

const {
  selectProdutos,
  selectProdutoEstoqueMin,
  ordernarMaiorPreco,
  ordernarMenorPreco,
  inserirProduto,
  deleteById,
  atualizar,
  selectProdutoById
} = require('../controller/Produto')
const {
  inserirCategoria
} = require ('../controller/Categoria')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/listar", selectProdutos)
router.get("/estoque_min", selectProdutoEstoqueMin)
router.get("/maior_preco", ordernarMaiorPreco)
router.get("/menor_preco", ordernarMenorPreco)
router.post("/delete", deleteById)
router.post("/atualizar", atualizar)

router.get("/cadastrar_p", (req, res) => {
  res.render('cadastrar_produtos')
})

router.get("/cadastrar_c", (req, res) => {
  res.render('cadastrar_categoria')
}) 

router.get("/cadastrar_clientes", (req, res) => {
  res.render('cadastrar_clientes')
})

router.post('/atualiza_produtos', selectProdutoById) ;

router.post("/inserir_produto", inserirProduto );

router.post("/inserir_categoria", inserirCategoria );

module.exports = router;
