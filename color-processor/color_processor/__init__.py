from color_processor.qr_code import qr_code_camera

import asyncio
import socketio

def main():

  # standard Python
  with socketio.SimpleClient() as sio:
      # ... connect to a server and use the client
      # ... no need to manually disconnect!
      sio.connect('http://localhost:8080')
      qr_code_camera(sio)
