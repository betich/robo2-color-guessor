from color_processor.qr_code import qr_code_camera
from color_processor.socket import app, web

import asyncio

def main():
  socket_task = asyncio.create_task(web.run_app(app))
  qr_code_task = asyncio.create_task(qr_code_camera())

  asyncio.gather(qr_code_task, socket_task)