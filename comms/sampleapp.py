from flask import Flask, request, send_from_directory

import coms
import generate
import blowfish
import os

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
    return ["Microsoft", "Google", "Amazon"]


@app.route('/generate/<label_name>')
def generate_password(label_name):
    print(generate.generate_password(), label_name)
    # TODO Encrypt New Generated Password and Save it.
    cipher = blowfish.Cipher(KEY)
    data_encrypted = b"".join(cipher.encrypt_ecb(generate_password())
    fo = open(FILENAME, "a")
    fo.write(label_name + " " + data_encrypted.decode('utf-8') + '\n'))
    fo.close()
    return "Ok"


@app.route('/to-keyboard/<label_name>')
def send_to_keyboard (label_name):
    print(generate.generate_password(), label_name)
    # TODO Decrypt Password assotiated with the Label name and send it to the keyboard
    fo = open(FILENAME, "r")
    readfile = fo.read().split('\n')
    for row in readfile:
        if label_name == row.split()[0]:
            cipher = blowfish.Cipher(KEY)
            data_decrypted = b"".join(cipher.decrypt_ecb(row.split()[1]).decode('utf-8')
            break
    coms.send_message(data_decrypted)
    return "Ok"


@app.route('/unlock/<lock_code>')
def unlock(lock_code):
    if lock_code == "1234":
        locked = False
    return "Ok"


@app.route('/lock')
def lock():
    locked = True
    return "Ok"



if __name__ == "__main__":
    app.run()

