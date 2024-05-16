from server import app,socketio

def main():
  app.run(port=5002)
  socketio.run(app)

if __name__ == "__main__":
  main()