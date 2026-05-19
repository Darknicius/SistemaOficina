import re

from models.client_model import get_client_by_id

from models.vehicle_model import (
    insert_vehicle,
    get_vehicle_by_id as model_get_vehicle_by_id,
    get_vehicle_by_plate,
    get_all_vehicles as model_get_all_vehicles,
    update_vehicle as model_update_vehicle,
    delete_vehicle as model_delete_vehicle,
)


CAMPOS_OBRIGATORIOS = [
    "clienteId",
    "placa",
    "modelo",
    "ano",
]


COMBUSTIVEIS_VALIDOS = {
    "Gasolina",
    "Alcool",
    "Flex",
    "Diesel",
}


def _validar_campos(data: dict) -> str | None:
    """Valida presença dos campos obrigatórios."""

    for campo in CAMPOS_OBRIGATORIOS:
        valor = data.get(campo)

        if valor is None:
            return f"campo obrigatório ausente: {campo}"

        if isinstance(valor, str) and not valor.strip():
            return f"campo obrigatório vazio: {campo}"

    return None


def _normalizar_dados(data: dict) -> dict:
    """Normaliza os dados do veículo."""

    placa = re.sub(r"[^A-Za-z0-9]", "", data["placa"]).upper()

    return {
        "clienteId": data["clienteId"],
        "placa": placa,
        "marca": data.get("marca", "").strip() or None,
        "modelo": data["modelo"].strip(),
        "ano": int(data["ano"]),
        "combustivel": data.get("combustivel"),
    }


def _validar_placa(placa: str) -> str | None:
    """
    Valida placa Mercosul e antiga.
    """

    placa = placa.upper()

    padrao_antigo = r"^[A-Z]{3}[0-9]{4}$"
    padrao_mercosul = r"^[A-Z]{3}[0-9][A-Z][0-9]{2}$"

    if not re.match(padrao_antigo, placa) and not re.match(padrao_mercosul, placa):
        return "placa inválida"

    return None


def _validar_combustivel(combustivel: str | None) -> str | None:
    """Valida combustível."""

    if combustivel is None:
        return None

    if combustivel not in COMBUSTIVEIS_VALIDOS:
        return "combustível inválido"

    return None


def create_vehicle(data: dict) -> tuple[dict, int]:
    """Cria um novo veículo."""

    erro_validacao = _validar_campos(data)

    if erro_validacao:
        return {"erro": erro_validacao}, 400

    data_normalizada = _normalizar_dados(data)

    cliente = get_client_by_id(data_normalizada["clienteId"])

    if not cliente:
        return {"erro": "cliente não encontrado"}, 404

    erro_placa = _validar_placa(data_normalizada["placa"])

    if erro_placa:
        return {"erro": erro_placa}, 400

    erro_combustivel = _validar_combustivel(
        data_normalizada.get("combustivel")
    )

    if erro_combustivel:
        return {"erro": erro_combustivel}, 400

    veiculo_existente = get_vehicle_by_plate(
        data_normalizada["placa"]
    )

    if veiculo_existente:
        return {"erro": "veículo já cadastrado"}, 409

    vehicle_id = insert_vehicle(data_normalizada)

    if not vehicle_id:
        return {"erro": "erro ao criar veículo"}, 500

    return {
        "mensagem": "veículo criado com sucesso",
        "id": vehicle_id
    }, 201


def get_vehicle_by_id(vehicle_id: int) -> tuple[dict, int]:
    """Busca veículo por ID."""

    if not vehicle_id:
        return {"erro": "id inválido"}, 400

    veiculo = model_get_vehicle_by_id(vehicle_id)

    if not veiculo:
        return {"erro": "veículo não encontrado"}, 404

    return veiculo, 200


def get_all_vehicles(cliente_id=None) -> tuple[dict, int]:
    """Lista veículos."""

    veiculos = model_get_all_vehicles(cliente_id)

    return {"veiculos": veiculos}, 200


def _normalizar_parcial(data: dict) -> dict:
    """Normaliza atualização parcial."""

    normalizado = {}

    if "placa" in data:
        normalizado["placa"] = re.sub(
            r"[^A-Za-z0-9]",
            "",
            data["placa"]
        ).upper()

    if "marca" in data:
        normalizado["marca"] = (
            data["marca"].strip()
            if data["marca"]
            else None
        )

    if "modelo" in data:
        normalizado["modelo"] = data["modelo"].strip()

    if "ano" in data:
        normalizado["ano"] = int(data["ano"])

    if "combustivel" in data:
        normalizado["combustivel"] = data["combustivel"]

    return normalizado


def update_vehicle(vehicle_id: int, data: dict) -> tuple[dict, int]:
    """Atualiza veículo."""

    if not vehicle_id or not data:
        return {"erro": "dados inválidos"}, 400

    veiculo = model_get_vehicle_by_id(vehicle_id)

    if not veiculo:
        return {"erro": "veículo não encontrado"}, 404

    data_normalizada = _normalizar_parcial(data)

    if "placa" in data_normalizada:

        erro_placa = _validar_placa(
            data_normalizada["placa"]
        )

        if erro_placa:
            return {"erro": erro_placa}, 400

        duplicado = get_vehicle_by_plate(
            data_normalizada["placa"]
        )

        if duplicado and duplicado["id"] != vehicle_id:
            return {"erro": "placa já cadastrada"}, 409

    if "combustivel" in data_normalizada:

        erro_combustivel = _validar_combustivel(
            data_normalizada["combustivel"]
        )

        if erro_combustivel:
            return {"erro": erro_combustivel}, 400

    atualizado = model_update_vehicle(
        vehicle_id,
        data_normalizada
    )

    if not atualizado:
        return {"erro": "erro ao atualizar veículo"}, 500

    return {
        "mensagem": "veículo atualizado com sucesso"
    }, 200


def delete_vehicle(vehicle_id: int) -> tuple[dict, int]:
    """Remove veículo."""

    if not vehicle_id:
        return {"erro": "id inválido"}, 400

    veiculo = model_get_vehicle_by_id(vehicle_id)

    if not veiculo:
        return {"erro": "veículo não encontrado"}, 404

    removido = model_delete_vehicle(vehicle_id)

    if not removido:
        return {"erro": "erro ao remover veículo"}, 500

    return {
        "mensagem": "veículo removido com sucesso"
    }, 200