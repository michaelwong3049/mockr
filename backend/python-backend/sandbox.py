import sys
import logging

import modal

from flask import Flask, request, jsonify
from flask_cors import CORS

logger = logging.getLogger(__name__)

# initialize modal 
app = modal.App.lookup("mockr", create_if_missing=True)
sb = modal.Sandbox.create(app=app)

# flask setup
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/modal", methods=["POST"])
def getCode():
    data = request.get_json()

    if data is None:
        return jsonify({"error": "No JSON provided"}), 400

    print(data.get("code"))
    p = sb.exec("python", "-c", data.get("code"))
    
    # this represents the print statements that users use for debugging
    stdout_print_lines = []

    for line in p.stdout: 
        print(line)
        stdout_print_lines.append(line)

    return jsonify({ "receieved": stdout_print_lines })
    # return jsonify({ "receieved": data })

if __name__ == "__main__":
    try:
        app.run(port=5000)
    except:
        logger.error("Error running flask app")



