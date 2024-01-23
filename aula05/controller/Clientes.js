const DatabaseSingleton = require("../config/ConfigDB");
const databaseInstance = new DatabaseSingleton();

async function inserirCliente(req, res) {
	let registro = req.body;
	databaseInstance.db.run(
		"INSERT INTO clientes (id, nome, cpf, endereco) VALUES (?, ?)",
		[
			registro.id,
			registro.nome,
            registro.cpf,
            registro.endereco
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
async function selectClientes(req, res) {
    databaseInstance.db.all(`SELECT 
    clientes.id,
    clientes.nome,
    clientes.cpf,
    clientes.endereco
	FROM clientes`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.render('listarClientes', { rows })
        console.table(rows);
    });
}


async function atualizarCliente(req, res) {
    let registro = req.body;
    databaseInstance.db.run(
        "UPDATE clientes SET nome=?, cpf=?, endereco=? WHERE id=?",
        [
            registro.nome,
            registro.cpf,
            registro.endereco,
        ],
        (err) => {
            if (err) {
                res.status(500).send("Erro ao atualizar o cliente no banco de dados.");
            } else {
                res.redirect("/");
            }
        }

    );
}


async function deleteClienteById(req, res) {
    let id = req.body.id
    databaseInstance.db.get('DELETE FROM clientes WHERE id=?', [id], (err) => {
        if (err) {
            res.status(500).send("Erro ao deletar o cliente no banco de dados.");
        } else {
            res.redirect("/");
        }
    })
}

async function selectClientById(req, res) {
    let id = req.body.id;
    databaseInstance.db.get(`SELECT * FROM cliente WHERE id=?`, [id], (err, item) => {
        if (err) {
            throw err;
        }
        console.table(item);
        console.table(id);
        res.render('atualiza_clientes', { item })
    });
}

module.exports = {
    selectClientes,
    atualizarCliente,
    deleteClienteById,
    selectClientById
};
