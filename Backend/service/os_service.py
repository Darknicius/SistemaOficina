import re
from datetime import datetime

from models.client_model import get_client_by_id

from models.vehicle_model import (
    get_vehicle_by_plate,
    insert_vehicle,
)

from models.os_model import (
    insert_os,
    get_os_by_id as model_get_os_by_id,
    get_all_os as model_get_all_os,
    update_os as model_update_os,
    delete_os as model_delete_os,
)

from models.product_model import (
    get_product_by_id,
)


STATUS_VALIDOS = {
    "Aberta",
    "Em andamento",
    "Aguardando Aprovação",
    "Aguardando peças",
    "Finalizada",
    "Entregue",
    "Cancelada",
}


CAMPOS_OBRIGATORIOS = [
    "clienteId",
    "veiculo",
]


def _validar_campos(data: dict) -> str | None:
    """Valida campos obrigatórios."""

    for campo in CAMPOS_OBRIGATORIOS:

        if campo not in data:
            return f"campo obrigatório ausente: {campo}"

        if data[campo] is None:
            return f"campo obrigatório inválido: {campo}"

    return None


def _validar_veiculo(data: dict) -> str | None:
    """Valida dados obrigatórios do veículo."""

    campos = [
        "placa",
        "modelo",
        "ano",
    ]

    for campo in campos:

        if campo not in data:
            return (
                f"campo obrigatório do veículo ausente: "
                f"{campo}"
            )

        if data[campo] is None:
            return (
                f"campo obrigatório do veículo inválido: "
                f"{campo}"
            )

        if (
            isinstance(data[campo], str)
            and not data[campo].strip()
        ):
            return (
                f"campo obrigatório do veículo vazio: "
                f"{campo}"
            )

    return None


def _validar_status(status: str) -> str | None:
    """Valida status da OS."""

    if status not in STATUS_VALIDOS:
        return "status inválido"

    return None


def _normalizar_placa(placa: str) -> str:
    """Normaliza placa."""

    return re.sub(
        r"[^A-Za-z0-9]",
        "",
        placa
    ).upper()


def _validar_placa(placa: str) -> str | None:
    """Valida placa."""

    padrao_antigo = r"^[A-Z]{3}[0-9]{4}$"
    padrao_mercosul = r"^[A-Z]{3}[0-9][A-Z][0-9]{2}$"

    if (
        not re.match(padrao_antigo, placa)
        and not re.match(padrao_mercosul, placa)
    ):
        return "placa inválida"

    return None


def _validar_produtos(
    produtos: list[dict]
) -> str | None:
    """Valida produtos da OS."""

    for item in produtos:

        if "produtoId" not in item:
            return "produtoId obrigatório"

        if "quantidade" not in item:
            return "quantidade obrigatória"

        produto = get_product_by_id(
            item["produtoId"]
        )

        if not produto:
            return (
                f"produto não encontrado: "
                f"{item['produtoId']}"
            )

        try:
            quantidade = int(item["quantidade"])

        except (ValueError, TypeError):
            return "quantidade inválida"

        if quantidade <= 0:
            return "quantidade deve ser maior que zero"

    return None


def _calcular_valor_produtos(
    produtos: list[dict]
) -> float:
    """Calcula total dos produtos."""

    total = 0

    for item in produtos:

        produto = get_product_by_id(
            item["produtoId"]
        )

        quantidade = int(
            item["quantidade"]
        )

        total += (
            produto["valorVenda"]
            * quantidade
        )

    return round(total, 2)


def create_os(data: dict) -> tuple[dict, int]:
    """Cria uma nova OS."""

    erro_validacao = _validar_campos(data)

    if erro_validacao:
        return {"erro": erro_validacao}, 400

    cliente_id = data["clienteId"]

    cliente = get_client_by_id(cliente_id)

    if not cliente:
        return {
            "erro": "cliente não encontrado"
        }, 404

    veiculo_data = data["veiculo"]

    erro_veiculo = _validar_veiculo(
        veiculo_data
    )

    if erro_veiculo:
        return {"erro": erro_veiculo}, 400

    placa = _normalizar_placa(
        veiculo_data["placa"]
    )

    erro_placa = _validar_placa(placa)

    if erro_placa:
        return {"erro": erro_placa}, 400

    veiculo = get_vehicle_by_plate(
        placa
    )

    if veiculo:

        veiculo_id = veiculo["id"]

    else:

        novo_veiculo = {
            "clienteId": cliente_id,
            "placa": placa,
            "marca": veiculo_data.get("marca"),
            "modelo": veiculo_data["modelo"],
            "ano": veiculo_data["ano"],
            "combustivel": veiculo_data.get(
                "combustivel"
            ),
        }

        veiculo_id = insert_vehicle(
            novo_veiculo
        )

        if not veiculo_id:
            return {
                "erro": "erro ao criar veículo"
            }, 500

    status = data.get(
        "status",
        "Aberta"
    )

    erro_status = _validar_status(
        status
    )

    if erro_status:
        return {"erro": erro_status}, 400

    produtos = data.get(
        "produtos",
        []
    )

    erro_produtos = _validar_produtos(
        produtos
    )

    if erro_produtos:
        return {"erro": erro_produtos}, 400

    valor_produtos = _calcular_valor_produtos(
        produtos
    )

    try:
        valor_servico = float(
            data.get("valorServico", 0)
        )

    except (ValueError, TypeError):
        return {
            "erro": "valorServico inválido"
        }, 400

    valor_total = round(
        valor_produtos + valor_servico,
        2
    )

    data_finalizacao = data.get(
        "dataFinalizacao"
    )

    if status == "Finalizada":
        data_finalizacao = datetime.now()

    os_data = {
        "clienteId": cliente_id,
        "veiculoId": veiculo_id,

        "status": status,

        "diagnostico": data.get(
            "diagnostico"
        ),

        "descricaoServico": data.get(
            "descricaoServico"
        ),

        "observacoes": data.get(
            "observacoes"
        ),

        "valorProdutos": valor_produtos,
        "valorServico": valor_servico,
        "valorTotal": valor_total,

        "dataFinalizacao": (
            data_finalizacao
        ),
    }

    os_id = insert_os(os_data)

    if not os_id:
        return {
            "erro": "erro ao criar OS"
        }, 500

    return {
        "mensagem": "OS criada com sucesso",
        "id": os_id,
    }, 201


def get_os_by_id(os_id: int) -> tuple[dict, int]:
    """Busca OS por ID."""

    if not os_id:
        return {"erro": "id inválido"}, 400

    os = model_get_os_by_id(os_id)

    if not os:
        return {"erro": "OS não encontrada"}, 404

    return os, 200


def get_all_os(
    cliente_id=None,
    status=None
) -> tuple[dict, int]:
    """Lista OS."""

    lista = model_get_all_os(
        cliente_id,
        status
    )

    return {
        "os": lista
    }, 200


def update_os(
    os_id: int,
    data: dict
) -> tuple[dict, int]:
    """Atualiza OS."""

    if not os_id or not data:
        return {"erro": "dados inválidos"}, 400

    os = model_get_os_by_id(os_id)

    if not os:
        return {"erro": "OS não encontrada"}, 404

    if "status" in data:

        erro_status = _validar_status(
            data["status"]
        )

        if erro_status:
            return {"erro": erro_status}, 400

        if (
            data["status"] == "Finalizada"
            and "dataFinalizacao" not in data
        ):
            data["dataFinalizacao"] = (
                datetime.now()
            )

    atualizado = model_update_os(
        os_id,
        data
    )

    if not atualizado:
        return {
            "erro": "erro ao atualizar OS"
        }, 500

    return {
        "mensagem": "OS atualizada com sucesso"
    }, 200


def delete_os(os_id: int) -> tuple[dict, int]:
    """Remove OS."""

    if not os_id:
        return {"erro": "id inválido"}, 400

    os = model_get_os_by_id(os_id)

    if not os:
        return {"erro": "OS não encontrada"}, 404

    removido = model_delete_os(os_id)

    if not removido:
        return {
            "erro": "erro ao remover OS"
        }, 500

    return {
        "mensagem": "OS removida com sucesso"
    }, 200