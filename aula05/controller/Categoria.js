const DatabaseSingleton = require("../config/ConfigDB");
const databaseInstance = new DatabaseSingleton();

async function inserirCategoria(req, res) {
	let registro = req.body;
	databaseInstance.db.run(
		"INSERT INTO categorias (id, nome) VALUES (?, ?)",
		[
			registro.id,
			registro.nome
		],
		(err) => {
			if (err) {
                res.status(500).send("Erro ao inserir o categoria no banco de dados.");
            } else {
                res.redirect("/");
            }
		}
	
	);
}

module.exports = {
inserirCategoria
}