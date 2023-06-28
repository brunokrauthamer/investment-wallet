from app import app
from flask import jsonify, request, make_response

@app.route('/new_movimentation', methods=['POST'])
def new_movimentation():
    movimentation = request.get_json()
    return make_response(jsonify(movimentation), 201)