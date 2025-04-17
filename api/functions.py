import base64
import uuid
from uuid_extensions import uuid7str

def user_id_gen():
    return str(uuid.uuid())


def iplogger_id_gen():
    return str(uuid7str())


def badtrip_id_gen():
    return str(uuid7str())


def encode_b64(data: str):
    return base64.b64encode(data.encode('ascii')).decode('ascii')

def decode_b64(data: str):
    return base64.b64decode(data.encode('ascii')).decode('ascii')