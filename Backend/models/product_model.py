import sqlite3
from datetime import datetime
from database.connection import get_connection


CAMPOS_PERMITIDOS_UPDATE = [
    "codigoInterno",
    "descricao",
    "valorVenda",
    "valorCusto",
    "estoque",
    "estoqueMinimo",
    "categoria",
    "observacao",
]


def insert_product(data: dict) -> int | None:
    """Insere um produto na tabela produtos e retorna o ID gerado."""

    sql = """
        INSERT INTO produtos (
            codigoInterno,
            descricao,
            valorVenda,
            valorCusto,
            estoque,
            estoqueMinimo,
            categoria,
            observacao,
            status,
            created_at,
            updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """

    agora = datetime.utcnow().isoformat()

    valores = (
        data.get("codigoInterno"),
        data["descricao"],
        data["valorVenda"],
        data.get("valorCusto"),
        data["estoque"],
        data["estoqueMinimo"],
        data.get("categoria"),
        data.get("observacao"),
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


def get_product_by_description(descricao: str) -> dict | None:
    """Busca um produto pela descrição."""

    sql = """
        SELECT *
        FROM produtos
        WHERE descricao = ?
        LIMIT 1
    """

    conn = None

    try:
        conn = get_connection()
        conn.row_factory = sqlite3.Row

        cursor = conn.cursor()

        cursor.execute(sql, (descricao,))

        row = cursor.fetchone()

        return dict(row) if row else None

    except sqlite3.Error:
        return None

    finally:
        if conn:
            conn.close()


def update_product(product_id: int, data: dict) -> bool:
    """Atualiza os campos permitidos de um produto."""

    campos = {
        k: v
        for k, v in data.items()
        if k in CAMPOS_PERMITIDOS_UPDATE
    }

    if not campos:
        return False

    campos["updated_at"] = datetime.utcnow().isoformat()

    set_clause = ", ".join(
        f"{campo} = ?"
        for campo in campos
    )

    valores = list(campos.values()) + [product_id]

    sql = f"""
        UPDATE produtos
        SET {set_clause}
        WHERE id = ?
    """

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


def get_all_products(search=None) -> list[dict]:
    """Retorna todos os produtos ativos."""

    sql = """
        SELECT *
        FROM produtos
        WHERE status = 1
    """

    params = []

    if search:
        sql += " AND descricao LIKE ?"
        params.append(f"{search}%")

    sql += " ORDER BY descricao ASC"

    conn = None

    try:
        conn = get_connection()
        conn.row_factory = sqlite3.Row

        cursor = conn.cursor()

        cursor.execute(sql, params)

        rows = cursor.fetchall()

        return [dict(row) for row in rows]

    except sqlite3.Error:
        return []

    finally:
        if conn:
            conn.close()


def delete_product(product_id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM produtos WHERE id = ?",
        (product_id,)
    )

    conn.commit()

    cursor.close()
    conn.close()


def get_product_by_id(product_id: int) -> dict | None:
    """Busca produto pelo ID."""

    sql = """
        SELECT *
        FROM produtos
        WHERE id = ?
        LIMIT 1
    """

    conn = None

    try:
        conn = get_connection()

        conn.row_factory = sqlite3.Row

        cursor = conn.cursor()

        cursor.execute(sql, (product_id,))

        row = cursor.fetchone()

        return dict(row) if row else None

    except sqlite3.Error:
        return None

    finally:
        if conn:
            conn.close()