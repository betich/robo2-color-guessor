from . import app, socketio
from flask import request


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/ping")
def ping():
    return "pong"

@socketio.on('my_event')
def handle_my_custom_event(json):
    print('received json: ' + str(json))

@socketio.event
def my_event(message):
    socketio.emit('my_response', {'data': 'got it!'})

# POST request, attempt to send mesaage to front end
@app.route("/emit", methods=["POST"])
async def emit():
    print('hi')
    if request == "POST":
      data = request.get_json()
      await socketio.emit('server_says_hi', {'data': data})
      return "Emitted!"
    
# Receive a message from the front end HTML
@socketio.on('send_message')   
def message_recieved(data):
    print(data['text'])
    emit('message_from_server', {'text':'Message recieved!'})