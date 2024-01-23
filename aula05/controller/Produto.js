const DatabaseSingleton = require("../config/ConfigDB");
const databaseInstance = new DatabaseSingleton();

async function selectProdutos(req, res) {
	databaseInstance.db.all(`SELECT produtos.id,
		produtos.nome,
		produtos.estoque,
		categorias.nome AS categoria,
		produtos.preco,
		produtos.descricao,
		produtos.url_da_imagem
	FROM produtos
	JOIN categorias ON produtos.categoria = categorias.id;`, (err, rows) => {
		if (err) {
			throw err;
		}
		res.render('listar', {rows})
		console.table(rows);
	});
}

async function selectProdutoEstoqueMin(req, res) {
	databaseInstance.db.all(
		`SELECT produtos.id,
				produtos.nome,
				produtos.estoque,
				categorias.nome AS categoria,
				produtos.preco,
				produtos.descricao,
				produtos.url_da_imagem
 		FROM produtos
 		JOIN categorias ON produtos.categoria = categorias.id 
		WHERE estoque >= 1
 		ORDER BY produtos.preco ASC;`,
		[],
		(err, rows) => {
			if (err) {
				throw err;
			}
			res.render('listar', {rows})
		}
	);
}

async function ordernarMenorPreco(req, res) {
	databaseInstance.db.all(
		`SELECT produtos.id,
				produtos.nome,
				produtos.estoque,
				categorias.nome AS categoria,
				produtos.preco,
				produtos.descricao,
				produtos.url_da_imagem
 		FROM produtos
 		JOIN categorias ON produtos.categoria = categorias.id 
 		ORDER BY produtos.preco ASC;`,
		[],
		(err, rows) => {
			if (err) {
				throw err;
			}
			res.render('listar', {rows})
		}
	);
}

async function ordernarMaiorPreco(req, res) {
	databaseInstance.db.all(
		`SELECT produtos.id,
				produtos.nome,
				produtos.estoque,
				categorias.nome AS categoria,
				produtos.preco,
				produtos.descricao,
				produtos.url_da_imagem
 		FROM produtos
 		JOIN categorias ON produtos.categoria = categorias.id 
 		ORDER BY produtos.preco DESC;`,
		[],
		(err, rows) => {
			if (err) {
				throw err;
			};
			res.render('listar', {rows})
		}
	);
}

async function inserirProduto(req, res) {
	let registro = req.body;
	databaseInstance.db.run(
		"INSERT INTO produtos (id, nome, estoque, categoria, preco, descricao, url_da_imagem) VALUES (?, ?, ?, ?, ?, ?, ?)",
		[
			registro.id,
			registro.nome,
			registro.estoque,
			registro.categoria,
			registro.preco,
			registro.descricao,
			registro.url_da_imagem,
		],
		(err) => {
			if (err) {
                res.status(500).send("Erro ao inserir o produto no banco de dados.");
            } else {
                res.redirect("/");
            }
		}
	
	);
}

async function atualizar(req, res) {
	let registro = req.body;
	databaseInstance.db.run(
		"UPDATE produtos SET nome=?, estoque=?, categoria=?, preco=?, descricao=?, url_da_imagem=? WHERE id=?",
		[
			registro.nome,
			registro.estoque,
			registro.categoria,
			registro.preco,
			registro.descricao,
			registro.url_da_imagem,
			registro.id,
		],
		(err) => {
			if (err) {
                res.status(500).send("Erro ao atualizar o produto no banco de dados.");
            } else {
                res.redirect("/");
            }
		}
	
	);
}


async function deleteById(req,res) {
	let id = req.body.id
	databaseInstance.db.get('DELETE FROM produtos WHERE id=?', [id], (err) => {
		if (err) {
			res.status(500).send("Erro ao deletar o produto no banco de dados.");
		} else {
			res.redirect("/");
		}
	} )
}

async function selectProdutoById(req, res) {
	let id = req.body.id;
	databaseInstance.db.get(`SELECT * FROM produtos WHERE id=?`, [id], (err, item) => {
		if (err) {
			throw err;
		}
		console.table(item);
		console.table(id);
		res.render('atualiza_produtos', { item })
	});
}

module.exports = {
	selectProdutos,
	selectProdutoEstoqueMin,
	ordernarMaiorPreco,
	ordernarMenorPreco,
	inserirProduto,
	deleteById,
	atualizar,
	selectProdutoById

};
