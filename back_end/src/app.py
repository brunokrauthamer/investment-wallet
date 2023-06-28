from flask import Flask, jsonify, request

app = Flask(__name__)
app.debug = True

from controllers.movimentation_controller import *
from controllers.login_controller import *

if __name__ == "__main__":
  app.run()