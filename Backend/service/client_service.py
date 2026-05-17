import re
from models.client_model import (
    get_client_by_cellphone,
    insert_client,
    get_all_clients as model_get_all_clients,
    get_client_by_id as model_get_client_by_id,
    update_client as model_update_client,
    disable_client as model_disable_client,
)


CAMPOS_OBRIGATORIOS = ["nome", "celular", "cep", "cidade", "estado", "endereco", "bairro"]

DDDS_VALIDOS = {
    11, 12, 13, 14, 15, 16, 17, 18, 19,
    21, 22, 24, 27, 28,
    31, 32, 33, 34, 35, 37, 38,
    41, 42, 43, 44, 45, 46,
    47, 48, 49,
    51, 53, 54, 55,
    61, 62, 63, 64, 65, 66, 67, 68, 69,
    71, 73, 74, 75, 77, 79,
    81, 82, 83, 84, 85, 86, 87, 88, 89,
    91, 92, 93, 94, 95, 96, 97, 98, 99,
}


def _validar_campos(data: dict) -> str | None:
    """Valida presença e preenchimento dos campos obrigatórios.
    Retorna mensagem de erro ou None se tudo válido."""
    for campo in CAMPOS_OBRIGATORIOS:
        valor = data.get(campo)
        if valor is None or (isinstance(valor, str) and not valor.strip()):
            return f"campo obrigatório ausente ou vazio: {campo}"
    return None


def _normalizar_dados(data: dict) -> dict:
    """Normaliza e sanitiza os dados recebidos."""
    apenas_numeros = lambda v: re.sub(r"\D", "", v) if isinstance(v, str) else None

    def opcional(v: str | None) -> str | None:
        if not v or not v.strip():
            return None
        return v.strip()

    return {
        "nome":        data["nome"].strip(),
        "celular":     apenas_numeros(data["celular"]),
        "telefone":    apenas_numeros(data.get("telefone")) or None,
        "cep":         apenas_numeros(data["cep"]),
        "cidade":      data["cidade"].strip(),
        "estado":      data["estado"].strip().upper(),
        "endereco":    data["endereco"].strip(),
        "bairro":      data["bairro"].strip(),
        "numero":      data["numero"].strip(),
        "complemento": opcional(data.get("complemento")),
    }


def _validar_celular(celular: str) -> str | None:
    """Valida formato, DDD e prefixo do celular.
    Retorna mensagem de erro ou None se válido."""
    if len(celular) != 11:
        return "celular inválido"

    ddd = int(celular[:2])
    if ddd not in DDDS_VALIDOS:
        return "celular inválido"

    if celular[2] != "9":
        return "celular inválido"

    return None


def create_client(data: dict) -> tuple[dict, int]:
    erro_validacao = _validar_campos(data)
    if erro_validacao:
        return {"erro": erro_validacao}, 400

    data_normalizada = _normalizar_dados(data)

    erro_celular = _validar_celular(data_normalizada["celular"])
    if erro_celular:
        return {"erro": erro_celular}, 400

    cliente_existente = get_client_by_cellphone(data_normalizada["celular"])
    if cliente_existente:
        return {"erro": "cliente já existe"}, 409

    insert_client(data_normalizada)

    return {"mensagem": "cliente criado com sucesso"}, 201


def get_client_by_id(client_id):
    """Busca um cliente pelo ID."""
    if not client_id:
        return {"erro": "id inválido"}, 400

    cliente = model_get_client_by_id(client_id)

    if not cliente:
        return {"erro": "cliente não encontrado"}, 404

    return cliente, 200


def get_all_clients(search=None) -> tuple[dict, int]:
    """Retorna todos os clientes ativos."""
    
    clientes = model_get_all_clients(search)

    return {"clientes": clientes}, 200


def _normalizar_parcial(data: dict) -> dict:
    """Normaliza apenas os campos presentes no dict de atualização."""
    apenas_numeros = lambda v: re.sub(r"\D", "", v) if isinstance(v, str) else None
    normalizado = {}

    CAMPOS_TEXTO = ["nome", "cidade", "endereco", "bairro", "numero", "complemento"]
    for campo in CAMPOS_TEXTO:
        if campo in data:
            v = data[campo]
            normalizado[campo] = v.strip() if isinstance(v, str) else v

    if "celular" in data:
        normalizado["celular"] = apenas_numeros(data["celular"])

    if "telefone" in data:
        normalizado["telefone"] = apenas_numeros(data["telefone"]) or None

    if "cep" in data:
        normalizado["cep"] = apenas_numeros(data["cep"])

    if "estado" in data:
        normalizado["estado"] = data["estado"].strip().upper() if isinstance(data["estado"], str) else data["estado"]

    return normalizado


def update_client(client_id: int, data: dict) -> tuple[dict, int]:
    """Atualiza parcialmente os dados de um cliente."""
    if not client_id or not data:
        return {"erro": "dados inválidos"}, 400

    cliente = model_get_client_by_id(client_id)
    if not cliente:
        return {"erro": "cliente não encontrado"}, 404

    data_normalizada = _normalizar_parcial(data)

    if "celular" in data_normalizada:
        erro_celular = _validar_celular(data_normalizada["celular"])
        if erro_celular:
            return {"erro": erro_celular}, 400

        duplicado = get_client_by_cellphone(data_normalizada["celular"])
        if duplicado and duplicado["id"] != client_id:
            return {"erro": "celular já cadastrado"}, 409

    model_update_client(client_id, data_normalizada)

    return {"mensagem": "cliente atualizado com sucesso"}, 200


def delete_client(client_id: int) -> tuple[dict, int]:
    """Desativa um cliente (soft delete)."""
    if not client_id:
        return {"erro": "dados inválidos"}, 400

    cliente = model_get_client_by_id(client_id)
    if not cliente:
        return {"erro": "cliente não encontrado"}, 404

    model_disable_client(client_id)

    return {"mensagem": "cliente desativado"}, 200