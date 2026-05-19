import sqlite3

DATABASE = "database/database.db"


def get_connection() -> sqlite3.Connection:
    """Abre e retorna uma nova conexão com o banco SQLite."""
    
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    return conn


def init_db() -> None:
    """Cria as tabelas do sistema caso não existam."""

    sql_clientes = """
        CREATE TABLE IF NOT EXISTS clientes (
            id           INTEGER  PRIMARY KEY AUTOINCREMENT,
            nome         TEXT     NOT NULL,
            celular      TEXT     NOT NULL UNIQUE,
            telefone     TEXT,
            cep          TEXT     NOT NULL,
            cidade       TEXT     NOT NULL,
            estado       TEXT     NOT NULL,
            endereco     TEXT     NOT NULL,
            bairro       TEXT     NOT NULL,
            numero       TEXT     NOT NULL,
            complemento  TEXT,
            ativo        BOOLEAN  DEFAULT 1,
            created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """

    sql_products = """
        CREATE TABLE IF NOT EXISTS produtos (
            id               INTEGER  PRIMARY KEY AUTOINCREMENT,
            codigoInterno    TEXT UNIQUE,
            descricao        TEXT     NOT NULL,
            valorVenda       REAL     NOT NULL,
            valorCusto       REAL,
            estoque          INTEGER  NOT NULL DEFAULT 0,
            estoqueMinimo    INTEGER  NOT NULL DEFAULT 0,
            categoria        TEXT,
            observacao       TEXT,
            status           BOOLEAN  DEFAULT 1,
            created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """

    sql_veiculos = """
        CREATE TABLE IF NOT EXISTS veiculos (
        id                  INTEGER PRIMARY KEY AUTOINCREMENT,
        clienteId           INTEGER,
        placa               TEXT UNIQUE NOT NULL,
        marca               TEXT,
        modelo              TEXT    NOT NULL,
        ano                 INTEGER    NOT NULL,
        combustivel         TEXT,
        quilometragem       INTEGER,
        created_at          DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at          DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (clienteId)
        REFERENCES clientes(id)
        ON DELETE CASCADE
        )
    """

    sql_ordens_servicos = """
        CREATE TABLE IF NOT EXISTS ordens_servicos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        clienteId INTEGER NOT NULL,
        veiculoId INTEGER NOT NULL,

        status TEXT NOT NULL,

        diagnostico TEXT,
        descricaoServico TEXT,
        observacoes TEXT,

        valorProdutos REAL DEFAULT 0,
        valorServico REAL DEFAULT 0,
        valorTotal REAL DEFAULT 0,

        dataAbertura DATETIME DEFAULT CURRENT_TIMESTAMP,
        dataFinalizacao DATETIME,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (clienteId)
            REFERENCES clientes(id),

        FOREIGN KEY (veiculoId)
            REFERENCES veiculos(id)
    )
    """

    sql_itens_ordens_servicos = """
    CREATE TABLE IF NOT EXISTS itens_ordens_servicos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    osId INTEGER NOT NULL,
    produtoId INTEGER NOT NULL,

    quantidade INTEGER NOT NULL,
    valorUnitario REAL NOT NULL,
    valorTotal REAL NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (osId)
        REFERENCES os(id)
        ON DELETE CASCADE,

    FOREIGN KEY (produtoId)
        REFERENCES produtos(id)
    )
    """

    conn = get_connection()

    try:
        conn.execute(sql_clientes)
        conn.execute(sql_products)
        conn.execute(sql_veiculos)
        conn.execute(sql_ordens_servicos)
        conn.execute(sql_itens_ordens_servicos)

        conn.commit()

    finally:
        conn.close()