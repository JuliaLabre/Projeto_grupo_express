const sqlite3 = require("sqlite3").verbose();

// Classe Singleton para o banco de dados
class DatabaseSingleton {
  constructor() {
    if (!DatabaseSingleton.instance) {
      // Cria uma instância do banco de dados SQLite
      this.db = new sqlite3.Database("database.db");
      this.db.serialize(() => {
        this.db.run(`
          CREATE TABLE IF NOT EXISTS categorias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT
          );
        `);

        this.db.run(`
          CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            estoque INTEGER,
            categoria INTEGER,
            preco REAL,
            descricao TEXT, 
            url_da_imagem TEXT,
            FOREIGN KEY (categoria) REFERENCES categorias (id)
          );
        `);

        this.db.run(`
          CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            cpf TEXT,
            endereco TEXT
          );
      
        `);
      });

      // Atribui a instância atual à propriedade estática
      DatabaseSingleton.instance = this;
    }

    // Retorna a instância única
    return DatabaseSingleton.instance;
  }
}

// Exporta a instância única
module.exports = DatabaseSingleton;
