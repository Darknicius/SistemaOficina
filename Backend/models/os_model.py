import sqlite3

from database.connection import get_connection


CAMPOS_PERMITIDOS_UPDATE = [
    "status",
    "diagnostico",
    "descricaoServico",
    "observacoes",
    "valorProdutos",
    "valorServico",
    "valorTotal",
    "dataFinalizacao",
]


def insert_os(data: dict) -> int | None:
    """Insere uma nova OS e retorna o ID gerado."""

    sql = """
        INSERT INTO ordens_servicos (
            clienteId,
            veiculoId,

            status,

            diagnostico,
            descricaoServico,
            observacoes,

            valorProdutos,
            valorServico,
            valorTotal,

            dataFinalizacao
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """

    valores = (
        data["clienteId"],
        data["veiculoId"],

        data["status"],

        data.get("diagnostico"),
        data.get("descricaoServico"),
        data.get("observacoes"),

        data.get("valorProdutos", 0),
        data.get("valorServico", 0),
        data.get("valorTotal", 0),

        data.get("dataFinalizacao"),
    )

    conn = None

    try:
        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(sql, valores)

        conn.commit()

        return cursor.lastrowid

    except sqlite3.Error as e:
        print(f"Erro ao inserir OS: {e}")
        return None

    finally:
        if conn:
            conn.close()


def get_os_by_id(os_id: int) -> dict | None:
    """Busca OS por ID."""

    sql = """
        SELECT *
        FROM ordens_servicos
        WHERE id = ?
        LIMIT 1
    """

    conn = None

    try:
        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(sql, (os_id,))

        row = cursor.fetchone()

        return dict(row) if row else None

    except sqlite3.Error as e:
        print(f"Erro ao buscar OS: {e}")
        return None

    finally:
        if conn:
            conn.close()


def get_all_os(
    cliente_id: int | None = None,
    status: str | None = None
) -> list[dict]:
    """Lista todas as OS."""

    sql = """
        SELECT *
        FROM ordens_servicos
    """

    filtros = []
    valores = []

    if cliente_id is not None:
        filtros.append("clienteId = ?")
        valores.append(cliente_id)

    if status is not None:
        filtros.append("status = ?")
        valores.append(status)

    if filtros:
        sql += " WHERE " + " AND ".join(filtros)

    sql += " ORDER BY created_at DESC"

    conn = None

    try:
        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(sql, tuple(valores))

        rows = cursor.fetchall()

        return [dict(row) for row in rows]

    except sqlite3.Error as e:
        print(f"Erro ao listar OS: {e}")
        return []

    finally:
        if conn:
            conn.close()


def update_os(os_id: int, data: dict) -> bool:
    """Atualiza OS."""

    campos = {
        k: v
        for k, v in data.items()
        if k in CAMPOS_PERMITIDOS_UPDATE
        and v is not None
    }

    if not campos:
        return False

    set_clause = ", ".join(
        f"{campo} = ?"
        for campo in campos
    )

    sql = f"""
        UPDATE ordens_servicos
        SET
            {set_clause},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    """

    valores = list(campos.values()) + [os_id]

    conn = None

    try:
        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(sql, valores)

        conn.commit()

        return cursor.rowcount > 0

    except sqlite3.Error as e:
        print(f"Erro ao atualizar OS: {e}")
        return False

    finally:
        if conn:
            conn.close()


def delete_os(os_id: int) -> bool:
    """Remove uma OS."""

    sql = """
        DELETE FROM ordens_servicos
        WHERE id = ?
    """

    conn = None

    try:
        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(sql, (os_id,))

        conn.commit()

        return cursor.rowcount > 0

    except sqlite3.Error as e:
        print(f"Erro ao remover OS: {e}")
        return False

    finally:
        if conn:
            conn.close()