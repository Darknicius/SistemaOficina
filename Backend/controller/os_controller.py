import logging

from flask import (
    Blueprint,
    request,
    jsonify,
)

from service.os_service import (
    create_os,
    get_os_by_id,
    get_all_os,
    update_os,
    delete_os,
)

from logs.logger import (
    setup_logger
)


logger = setup_logger()

os_bp = Blueprint(
    "os",
    __name__
)


@os_bp.route(
    "/os/adicionar",
    methods=["POST"]
)
def add_os():

    data = request.get_json()

    response, status_code = create_os(
        data
    )

    logger.info(
        f"POST /os/adicionar "
        f"retornou {status_code} "
        f"com a mensagem: {response}"
    )

    return jsonify(response), status_code


@os_bp.route(
    "/os",
    methods=["GET"]
)
def list_os():

    cliente_id = request.args.get(
        "clienteId",
        type=int
    )

    status = request.args.get(
        "status"
    )

    response, status_code = get_all_os(
        cliente_id,
        status
    )

    logger.info(
        f"GET /os "
        f"retornou {status_code} "
        f"com a mensagem: {response}"
    )

    return jsonify(response), status_code


@os_bp.route(
    "/os/<int:os_id>",
    methods=["GET"]
)
def find_os_by_id(os_id):

    response, status_code = get_os_by_id(
        os_id
    )

    logger.info(
        f"GET /os/{os_id} "
        f"retornou {status_code} "
        f"com a mensagem: {response}"
    )

    return jsonify(response), status_code


@os_bp.route(
    "/os/<int:os_id>",
    methods=["PUT"]
)
def edit_os(os_id):

    data = request.get_json()

    response, status_code = update_os(
        os_id,
        data
    )

    logger.info(
        f"PUT /os/{os_id} "
        f"retornou {status_code} "
        f"com a mensagem: {response}"
    )

    return jsonify(response), status_code


@os_bp.route(
    "/os/<int:os_id>",
    methods=["DELETE"]
)
def remove_os(os_id):

    response, status_code = delete_os(
        os_id
    )

    logger.info(
        f"DELETE /os/{os_id} "
        f"retornou {status_code} "
        f"com a mensagem: {response}"
    )

    return jsonify(response), status_code