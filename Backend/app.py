from flask import Flask
from flask_cors import CORS

from controller.client_controller import client_bp
from controller.product_controller import product_bp

from database.connection import init_db
from logs.logger import setup_logger

logger = setup_logger()

app = Flask(__name__)

CORS(
    app,
    resources={r"/*": {"origins": "http://localhost:5173"}},
)

init_db()

app.register_blueprint(client_bp)
app.register_blueprint(product_bp)

if __name__ == "__main__":
    app.run(debug=True)