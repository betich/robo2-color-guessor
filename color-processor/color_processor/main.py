from color_processor.qr_code import qr_code_camera
from color_processor.app import app


def main():
  # app.run(host='0.0.0.0', port=5002)
  qr_code_camera()

if __name__ == '__main__':
  main()
