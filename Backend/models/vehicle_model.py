import sqlite3
from database.connection import get_connection


CAMPOS_PERMITIDOS_UPDATE = [
    "clienteId",
    "placa",
    "marca",
    "modelo",
    "ano",
    "combustivel",
]


def insert_vehicle(data: dict) -> int | None:
    """Insere um veículo e retorna o ID gerado."""

    sql = """
        INSERT INTO veiculos (
            clienteId,
            placa,
            marca,
            modelo,
            ano,
            combustivel
        )
        VALUES (?, ?, ?, ?, ?, ?)
    """

    valores = (
        data["clienteId"],
        data.get("placa"),
        data.get("marca"),
        data["modelo"],
        data["ano"],
        data.get("combustivel"),
    )

    conn = None

    try:
        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(sql, valores)

        conn.commit()

        return cursor.lastrowid

    except sqlite3.Error as e:
        print(f"Erro ao inserir veículo: {e}")
        return None

    finally:
        if conn:
            conn.close()


def get_vehicle_by_id(vehicle_id: int) -> dict | None:
    """Busca veículo pelo ID."""

    sql = """
        SELECT *
        FROM veiculos
        WHERE id = ?
        LIMIT 1
    """

    conn = None

    try:
        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(sql, (vehicle_id,))

        row = cursor.fetchone()

        return dict(row) if row else None

    except sqlite3.Error:
        return None

    finally:
        if conn:
            conn.close()


def get_vehicle_by_plate(placa: str) -> dict | None:
    """Busca veículo pela placa."""

    sql = """
        SELECT *
        FROM veiculos
        WHERE placa = ?
        LIMIT 1
    """

    conn = None

    try:
        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(sql, (placa,))

        row = cursor.fetchone()

        return dict(row) if row else None

    except sqlite3.Error:
        return None

    finally:
        if conn:
            conn.close()


def get_all_vehicles(cliente_id: int | None = None) -> list[dict]:
    """Lista todos os veículos."""

    sql = """
        SELECT *
        FROM veiculos
    """

    valores = ()

    if cliente_id is not None:
        sql += " WHERE clienteId = ?"
        valores = (cliente_id,)

    sql += " ORDER BY created_at DESC"

    conn = None

    try:
        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(sql, valores)

        rows = cursor.fetchall()

        return [dict(row) for row in rows]

    except sqlite3.Error:
        return []

    finally:
        if conn:
            conn.close()


def get_vehicles_by_client(cliente_id: int) -> list[dict]:
    """Lista todos os veículos de um cliente."""

    return get_all_vehicles(cliente_id)


def update_vehicle(vehicle_id: int, data: dict) -> bool:
    """Atualiza os dados permitidos do veículo."""

    campos = {
        k: v
        for k, v in data.items()
        if k in CAMPOS_PERMITIDOS_UPDATE
    }

    if not campos:
        return False

    set_clause = ", ".join(
        f"{campo} = ?" for campo in campos
    )

    sql = f"""
        UPDATE veiculos
        SET
            {set_clause},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    """

    valores = list(campos.values()) + [vehicle_id]

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


def delete_vehicle(vehicle_id: int) -> bool:
    """Remove um veículo."""

    sql = """
        DELETE FROM veiculos
        WHERE id = ?
    """

    conn = None

    try:
        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(sql, (vehicle_id,))

        conn.commit()

        return cursor.rowcount > 0

    except sqlite3.Error:
        return False

    finally:
        if conn:
            conn.close()