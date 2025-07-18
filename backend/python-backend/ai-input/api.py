from flask import Flask
from flask_socketio import SocketIO, send
from flask_cors import CORS

flask_app = Flask(__name__)
cors = CORS(flask_app, resources={r"/api/*": {"origins": "*"}})
socketio = SocketIO(flask_app, cors_allowed_origins="*")

@socketio.on("connect")
def connect():
    print("-- connected to websocket -- ")

@socketio.on("update interview")
def handle_message(data):
    print("received data from frontend");
    print(data)
    try:
        send_agent_data(data)
    except Exception as e:
        print(e)

@socketio.on("agent_data")
def send_agent_data(data):
    socketio.emit("agent_data", data)
    print("sending data...?")

if __name__ == "__main__":
    socketio.run(flask_app, debug=True, port=5000)
    # flask_app.run()
