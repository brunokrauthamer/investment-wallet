import jwt
from datetime import datetime, timedelta

def create_token(payload):
    payload["exp"] = datetime.utcnow() + timedelta(hours=8)
    token = jwt.encode(payload, "secret_key", algorithm='HS256')
    return token