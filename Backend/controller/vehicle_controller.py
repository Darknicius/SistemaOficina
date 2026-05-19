import logging

from flask import Blueprint, request, jsonify

from service.vehicle_service import (
    create_vehicle,
    get_vehicle_by_id,
    get_all_vehicles,
    update_vehicle,
    delete_vehicle,
)

from logs.logger import setup_logger


logger = setup_logger()

vehicle_bp = Blueprint("vehicle", __name__)


@vehicle_bp.route("/veiculos/adicionar", methods=["POST"])
def add_vehicle():

    data = request.get_json()

    response, status_code = create_vehicle(data)

    logger.info(
        f"POST /veiculos/adicionar retornou "
        f"{status_code} com a mensagem: {response}"
    )

    return jsonify(response), status_code


@vehicle_bp.route("/veiculos", methods=["GET"])
def list_vehicles():

    cliente_id = request.args.get("clienteId", type=int)

    response, status_code = get_all_vehicles(cliente_id)

    logger.info(
        f"GET /veiculos?clienteId={cliente_id} "
        f"retornou {status_code} com a mensagem: {response}"
    )

    return jsonify(response), status_code


@vehicle_bp.route("/veiculos/<int:vehicle_id>", methods=["GET"])
def find_vehicle_by_id(vehicle_id):

    response, status_code = get_vehicle_by_id(vehicle_id)

    logger.info(
        f"GET /veiculos/{vehicle_id} "
        f"retornou {status_code} com a mensagem: {response}"
    )

    return jsonify(response), status_code


@vehicle_bp.route("/veiculos/<int:vehicle_id>", methods=["PUT"])
def edit_vehicle(vehicle_id):

    data = request.get_json()

    response, status_code = update_vehicle(
        vehicle_id,
        data
    )

    logger.info(
        f"PUT /veiculos/{vehicle_id} "
        f"retornou {status_code} com a mensagem: {response}"
    )

    return jsonify(response), status_code


@vehicle_bp.route("/veiculos/<int:vehicle_id>", methods=["DELETE"])
def remove_vehicle(vehicle_id):

    response, status_code = delete_vehicle(vehicle_id)

    logger.info(
        f"DELETE /veiculos/{vehicle_id} "
        f"retornou {status_code} com a mensagem: {response}"
    )

    return jsonify(response), status_code