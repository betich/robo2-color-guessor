from flask import Flask

app = Flask(__name__)

from color_processor.app import routes