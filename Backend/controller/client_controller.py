import logging

from flask import Blueprint, request, jsonify
from service.client_service import create_client, get_client_by_cpf, get_all_clients, update_client, delete_client
from logs.logger import setup_logger

logger = setup_logger()

client_bp = Blueprint("client", __name__)


@client_bp.route("/clientes/adicionar", methods=["POST"])
def add_client():
    data = request.get_json()
    response, status_code = create_client(data)
    logger.info(f"POST /clientes/adicionar retornou {status_code} com a mensagem: {response}")
    return jsonify(response), status_code


@client_bp.route("/clientes", methods=["GET"])
def find_client_by_cpf():
    cpf = request.args.get("cpf")
    response, status_code = get_client_by_cpf(cpf)
    logger.info(f"GET /clientes retornou {status_code} com a mensagem: {response}")
    return jsonify(response), status_code


@client_bp.route("/clientes/all", methods=["GET"])
def list_all_clients():
    response, status_code = get_all_clients()
    logger.info(f"GET /clientes/all retornou {status_code} com a mensagem: {response}")
    return jsonify(response), status_code


@client_bp.route("/clientes/<int:client_id>", methods=["PUT"])
def edit_client(client_id):
    data = request.get_json()
    response, status_code = update_client(client_id, data)
    logger.info(f"PUT /clientes/<int:client_id> retornou {status_code} com a mensagem: {response}")
    return jsonify(response), status_code


@client_bp.route("/clientes/<int:client_id>", methods=["DELETE"])
def remove_client(client_id):
    response, status_code = delete_client(client_id)
    logger.info(f"DELETE /clientes/<int:client_id> retornou {status_code} com a mensagem: {response}")
    return jsonify(response), status_code