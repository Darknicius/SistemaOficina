import sqlite3

from database.connection import (
    get_connection
)


def insert_item_os(data: dict) -> int | None:
    """Insere item da OS."""

    sql = """
        INSERT INTO itens_ordens_servicos (
            osId,
            produtoId,

            quantidade,

            valorUnitario,
            valorTotal
        )
        VALUES (?, ?, ?, ?, ?)
    """

    valores = (
        data["osId"],
        data["produtoId"],

        data["quantidade"],

        data["valorUnitario"],
        data["valorTotal"],
    )

    conn = None

    try:
        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(sql, valores)

        conn.commit()

        return cursor.lastrowid

    except sqlite3.Error as e:
        print(
            f"Erro ao inserir item OS: {e}"
        )

        return None

    finally:
        if conn:
            conn.close()


def get_items_by_os(
    os_id: int
) -> list[dict]:
    """Lista itens de uma OS."""

    sql = """
        SELECT
            itens_ordens_servicos.*,

            produtos.descricao,
            produtos.codigoInterno

        FROM itens_ordens_servicos

        INNER JOIN produtos
            ON produtos.id = itens_ordens_servicos.produtoId

        WHERE itens_ordens_servicos.osId = ?

        ORDER BY itens_ordens_servicos.id ASC
    """

    conn = None

    try:
        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(sql, (os_id,))

        rows = cursor.fetchall()

        return [
            dict(row)
            for row in rows
        ]

    except sqlite3.Error as e:

        print(
            f"Erro ao listar itens OS: {e}"
        )

        return []

    finally:
        if conn:
            conn.close()


def delete_items_by_os(
    os_id: int
) -> bool:
    """Remove itens de uma OS."""

    sql = """
        DELETE FROM itens_ordens_servicos
        WHERE osId = ?
    """

    conn = None

    try:
        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(sql, (os_id,))

        conn.commit()

        return True

    except sqlite3.Error as e:

        print(
            f"Erro ao remover itens OS: {e}"
        )

        return False

    finally:
        if conn:
            conn.close()