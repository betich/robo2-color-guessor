from color_processor.app import app

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"