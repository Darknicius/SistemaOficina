from flask import Flask
from logs.logger import setup_logger
from flask_cors import CORS

from controller.client_controller import client_bp
from database.connection import init_db

logger = setup_logger()

app = Flask(__name__)
CORS(app)

init_db()

app.register_blueprint(client_bp)

if __name__ == "__main__":
    app.run(debug=True)