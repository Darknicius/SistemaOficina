import sqlite3

DATABASE = "database/database.db"


def get_connection() -> sqlite3.Connection:
    """Abre e retorna uma nova conexão com o banco SQLite."""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    """Cria a tabela clientes no banco caso ela não exista."""
    sql = """
        CREATE TABLE IF NOT EXISTS clientes (
            id          INTEGER  PRIMARY KEY AUTOINCREMENT,
            nome        TEXT     NOT NULL,
            celular     TEXT     NOT NULL UNIQUE,
            telefone    TEXT,
            cep         TEXT     NOT NULL,
            cidade      TEXT     NOT NULL,
            estado      TEXT     NOT NULL,
            endereco    TEXT     NOT NULL,
            bairro      TEXT     NOT NULL,
            numero      TEXT     NOT NULL,
            complemento TEXT,
            ativo       BOOLEAN  DEFAULT 1,
            created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """
    conn = get_connection()
    try:
        conn.execute(sql)
        conn.commit()
    finally:
        conn.close()
