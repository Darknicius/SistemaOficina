import logging

from flask import Blueprint, request, jsonify
from service.product_service import create_product, get_product_by_id, get_all_products, update_product, delete_product
from logs.logger import setup_logger

logger = setup_logger()

product_bp = Blueprint("product", __name__)


@product_bp.route("/produtos/adicionar", methods=["POST"])
def add_product():
    data = request.get_json()
    response, status_code = create_product(data)
    logger.info(f"POST /produtos/adicionar retornou {status_code} com a mensagem: {response}")
    return jsonify(response), status_code

@product_bp.route("/produtos", methods=["GET"])
def list_products():
    search = request.args.get("search")
    response, status_code = get_all_products(search)
    logger.info(f"GET /produtos?search={search} retornou {status_code} com a mensagem: {response}")
    return jsonify(response), status_code

@product_bp.route("/produtos/all", methods=["GET"])
def list_all_products():
    response, status_code = get_all_products()
    logger.info(f"GET /produtos/all retornou {status_code} com a mensagem: {response}")
    return jsonify(response), status_code

@product_bp.route("/produtos/<int:product_id>", methods=["GET"])
def find_product_by_id(product_id):
    response, status_code = get_product_by_id(product_id)
    logger.info(f"GET /produtos/<int:product_id> retornou {status_code} com a mensagem: {response}")
    return jsonify(response), status_code


@product_bp.route("/produtos/<int:product_id>", methods=["PUT"])
def edit_product(product_id):
    data = request.get_json()
    response, status_code = update_product(product_id, data)
    logger.info(f"PUT /produtos/<int:product_id> retornou {status_code} com a mensagem: {response}")
    return jsonify(response), status_code


@product_bp.route("/produtos/<int:product_id>", methods=["DELETE"])
def remove_product(product_id):
    response, status_code = delete_product(product_id)
    logger.info(f"DELETE /produtos/<int:product_id> retornou {status_code} com a mensagem: {response}")
    return jsonify(response), status_code