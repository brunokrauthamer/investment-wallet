from app import app
from flask import jsonify, request, make_response
from utils.jwt import create_token

mock_valid_credentials = {
  "email": "bruno@bruno.com",
  "password": "123456"
}

@app.route('/login', methods=['POST'])
def login():
  credentials = request.get_json()
  if credentials == mock_valid_credentials:
    token = create_token(credentials)
    return make_response(jsonify({ "token": token }), 200)
  else:
    return make_response(jsonify({ "message": "Invalid e-mail or password" }), 401)

@app.route('/create', methods=['POST'])
def create_user():
  credentials = request.get_json()
  # Se o e-mail já existir no banco retorno 409
  # Se não existir, insiro esse novo usuário no banco retorno o token dele com status 201