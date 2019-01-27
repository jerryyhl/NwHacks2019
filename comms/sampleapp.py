from flask import Flask, request, send_from_directory

import coms
import generate
import blowfish
import os
import json
import base64
import requests

from lib import lib

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_folder='')


locked = True

PASSWORD = "1234"
KEY = b"MYKEY"
FILENAME = "encrypted_pw.txt"


root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static")

@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory(root, path)


@app.route('/', methods=['GET'])
def redirect_to_index():
    return send_from_directory(root, 'index.html')


@app.route('/get-all-labels')
def get_all_labels():
    try:
        with open(FILENAME, "r") as fo:
            readfile = fo.read().split('\n')
            print(readfile)
            labels = []
            for row in readfile:
                print(row)
                labels.append(row.split(",")[0])
            return json.dumps(labels)
    except:
        return json.dumps([])



@app.route('/generate/<label_name>')
def generate_password(label_name):
    new_pass = generate.generate_password()
    # TODO Encrypt New Generated Password and Save it.
    # cipher = blowfish.Cipher(KEY)
    # data_encrypted = b"".join(cipher.encrypt_ecb(bytes(generate.generate_password(), 'utf-8')))
    # data_encrypted = base64.b64encode(data_encrypted)
    fo = open(FILENAME, "a")
    # fo.write(label_name + "," + data_encrypted + '\n')
    fo.write(label_name + "," + new_pass + '\n')
    fo.close()
    return "Ok"


@app.route('/to-keyboard/<label_name>')
def send_to_keyboard(label_name):
    # TODO Decrypt Password assotiated with the Label name and send it to the keyboard
    with open(FILENAME, "r") as fo:
        readfile = fo.read().split('\n')
        for row in readfile:
            if label_name != "":
                if label_name == row.split(",")[0]:
                    # cipher = blowfish.Cipher(KEY)
                    # data_decrypted = b"".join(cipher.decrypt_ecb(base64.b64decode(row.split(",")[1])))
                    coms.send_message(row.split(",")[1])
                    print(row.split(",")[1])
                    break
        return "Ok"


@app.route('/unlock/<lock_code>')
def unlock(lock_code):
    global locked
    if lock_code == PASSWORD:
        locked = False

        sms = lib.utils.sms["@1.0.9"]

        location = requests.get('http://api.ipstack.com/134.201.250.155?access_key=5686df479d84af09fabcecb68982eee1')

        result = sms(
            to="+17788366806",  # (required)
            body="Dragon Lock Unlocked from " + location.text  # (required)
        )

        return "SUCCESS"
    return "FAIL"


@app.route('/lock')
def lock():
    global locked
    locked = True
    return "Ok"


@app.route('/is-locked')
def isLocked():
    global locked
    return json.dumps({"locked": locked})


if __name__ == "__main__":
    app.run()

