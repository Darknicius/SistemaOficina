import sqlite3
from datetime import datetime
from database.connection import get_connection


CAMPOS_PERMITIDOS_UPDATE = [
    "nome", "celular", "telefone", "cep", "cidade",
    "estado", "endereco", "bairro", "numero", "complemento",
]


def insert_client(data: dict) -> int | None:
    """Insere um cliente na tabela clientes e retorna o ID gerado."""
    sql = """
        INSERT INTO clientes (
            nome, celular, telefone, cep, cidade, estado,
            endereco, bairro, numero, complemento, ativo, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """
    agora = datetime.utcnow().isoformat()
    valores = (
        data["nome"],
        data["celular"],
        data.get("telefone"),
        data["cep"],
        data["cidade"],
        data["estado"],
        data["endereco"],
        data["bairro"],
        data.get("numero"),
        data.get("complemento"),
        True,
        agora,
        agora,
    )

    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(sql, valores)
        conn.commit()
        return cursor.lastrowid
    except sqlite3.Error:
        return None
    finally:
        if conn:
            conn.close()


def get_client_by_cellphone(celular: str) -> dict | None:
    """Busca um cliente pelo número de celular. Retorna dict ou None."""
    sql = "SELECT * FROM clientes WHERE celular = ? LIMIT 1"

    conn = None
    try:
        conn = get_connection()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute(sql, (celular,))
        row = cursor.fetchone()
        return dict(row) if row else None
    except sqlite3.Error:
        return None
    finally:
        if conn:
            conn.close()


def update_client(client_id: int, data: dict) -> bool:
    """Atualiza os campos permitidos de um cliente. Retorna True se bem-sucedido."""
    campos = {k: v for k, v in data.items() if k in CAMPOS_PERMITIDOS_UPDATE}
    if not campos:
        return False

    campos["updated_at"] = datetime.utcnow().isoformat()

    set_clause = ", ".join(f"{campo} = ?" for campo in campos)
    valores = list(campos.values()) + [client_id]

    sql = f"UPDATE clientes SET {set_clause} WHERE id = ?"

    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(sql, valores)
        conn.commit()
        return cursor.rowcount > 0
    except sqlite3.Error:
        return False
    finally:
        if conn:
            conn.close()


def get_all_clients(search=None) -> list[dict]:
    """Retorna todos os clientes ativos (ativo = 1)."""
    sql = "SELECT * FROM clientes WHERE ativo = 1"

    if search:
        sql += " AND nome LIKE ?"
        search = f"{search}%"

    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(sql, (search,) if search else ())
        rows = cursor.fetchall()
        return [dict(row) for row in rows]
    except sqlite3.Error:
        return []
    finally:
        if conn:
            conn.close()

def disable_client(client_id: int) -> bool:
    """Desativa um cliente setando ativo = 0. Retorna True se bem-sucedido."""
    sql = "UPDATE clientes SET ativo = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
 
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(sql, (client_id,))
        conn.commit()
        return cursor.rowcount > 0
    except sqlite3.Error:
        return False
    finally:
        if conn:
            conn.close()

def get_client_by_id(client_id: int) -> dict | None:
    """Busca cliente pelo ID."""
    sql = "SELECT * FROM clientes WHERE id = ? LIMIT 1"

    conn = None
    try:
        conn = get_connection()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute(sql, (client_id,))
        row = cursor.fetchone()
        return dict(row) if row else None
    except sqlite3.Error:
        return None
    finally:
        if conn:
            conn.close()