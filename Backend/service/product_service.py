import re
from models.product_model import (
    get_product_by_description,
    insert_product,
    get_all_products as model_get_all_products,
    get_product_by_id as model_get_product_by_id,
    update_product as model_update_product,
    delete_product as model_delete_product,
)


CAMPOS_OBRIGATORIOS = [
    "descricao",
    "valorVenda",
    "estoque",
    "estoqueMinimo",
]


def _validar_campos(data: dict) -> str | None:
    """Valida presença e preenchimento dos campos obrigatórios."""
    for campo in CAMPOS_OBRIGATORIOS:
        valor = data.get(campo)

        if valor is None:
            return f"campo obrigatório ausente: {campo}"

        if isinstance(valor, str) and not valor.strip():
            return f"campo obrigatório vazio: {campo}"

    return None


def _normalizar_dados(data: dict) -> dict:
    """Normaliza e sanitiza os dados recebidos."""

    def texto(v):
        return v.strip() if isinstance(v, str) else v

    return {
        "codigoInterno": texto(data.get("codigoInterno")),
        "descricao": texto(data["descricao"]),
        "valorVenda": float(data["valorVenda"]),
        "valorCusto": float(data["valorCusto"]) if data.get("valorCusto") not in [None, ""] else None,
        "estoque": int(data["estoque"]),
        "estoqueMinimo": int(data["estoqueMinimo"]),
        "categoria": texto(data.get("categoria")),
        "observacao": texto(data.get("observacao")),
    }


def _validar_produto(data: dict) -> str | None:
    """Valida regras de negócio do produto."""

    if data["valorVenda"] < 0:
        return "valor de venda inválido"

    if data.get("valorCusto") is not None and data["valorCusto"] < 0:
        return "valor de custo inválido"

    if data["estoque"] < 0:
        return "estoque inválido"

    if data["estoqueMinimo"] < 0:
        return "estoque mínimo inválido"

    return None


def create_product(data: dict) -> tuple[dict, int]:
    erro_validacao = _validar_campos(data)

    if erro_validacao:
        return {"erro": erro_validacao}, 400

    data_normalizada = _normalizar_dados(data)

    erro_produto = _validar_produto(data_normalizada)

    if erro_produto:
        return {"erro": erro_produto}, 400

    produto_existente = get_product_by_description(
        data_normalizada["descricao"]
    )

    if produto_existente:
        return {"erro": "produto já existe"}, 409

    insert_product(data_normalizada)

    return {"mensagem": "produto criado com sucesso"}, 201


def get_product_by_id(product_id):
    """Busca um produto pelo ID."""

    if not product_id:
        return {"erro": "id inválido"}, 400

    produto = model_get_product_by_id(product_id)

    if not produto:
        return {"erro": "produto não encontrado"}, 404

    return produto, 200


def get_all_products(search=None) -> tuple[dict, int]:
    """Retorna todos os produtos ativos."""

    produtos = model_get_all_products(search)

    return {"produtos": produtos}, 200


def _normalizar_parcial(data: dict) -> dict:
    """Normaliza apenas os campos enviados na atualização."""

    normalizado = {}

    CAMPOS_TEXTO = [
        "codigoInterno",
        "descricao",
        "categoria",
        "observacao",
    ]

    for campo in CAMPOS_TEXTO:
        if campo in data:
            valor = data[campo]
            normalizado[campo] = (
                valor.strip()
                if isinstance(valor, str)
                else valor
            )

    CAMPOS_FLOAT = [
        "valorVenda",
        "valorCusto",
    ]

    for campo in CAMPOS_FLOAT:
        if campo in data:
            valor = data[campo]

            normalizado[campo] = (
                float(valor)
                if valor not in [None, ""]
                else None
            )

    CAMPOS_INT = [
        "estoque",
        "estoqueMinimo",
    ]

    for campo in CAMPOS_INT:
        if campo in data:
            normalizado[campo] = int(data[campo])

    return normalizado


def update_product(product_id: int, data: dict) -> tuple[dict, int]:
    """Atualiza parcialmente um produto."""

    if not product_id or not data:
        return {"erro": "dados inválidos"}, 400

    produto = model_get_product_by_id(product_id)

    if not produto:
        return {"erro": "produto não encontrado"}, 404

    data_normalizada = _normalizar_parcial(data)

    if "descricao" in data_normalizada:
        duplicado = get_product_by_description(
            data_normalizada["descricao"]
        )

        if duplicado and duplicado["id"] != product_id:
            return {"erro": "produto já cadastrado"}, 409

    erro_produto = _validar_produto({
        **produto,
        **data_normalizada,
    })

    if erro_produto:
        return {"erro": erro_produto}, 400

    model_update_product(product_id, data_normalizada)

    return {"mensagem": "produto atualizado com sucesso"}, 200


def delete_product(product_id: int) -> tuple[dict, int]:
    """Remove um produto permanentemente."""

    if not product_id:
        return {"erro": "dados inválidos"}, 400

    produto = model_get_product_by_id(product_id)

    if not produto:
        return {"erro": "produto não encontrado"}, 404

    model_delete_product(product_id)

    return {"mensagem": "produto deletado"}, 200