from flask import Flask, request, send_from_directory

import coms
import generate
import os
import json

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_folder='')


locked = True

PASSWORD = "1234"


root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static")

@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory(root, path)


@app.route('/', methods=['GET'])
def redirect_to_index():
    return send_from_directory(root, 'index.html')


@app.route('/get-all-labels')
def get_all_labels():
    return json.dumps(["Microsoft", "Google", "Amazon"])


@app.route('/generate/<label_name>')
def generate_password(label_name):
    print(generate.generate_password(), label_name)
    # TODO Encrypt New Generated Password and Save it.
    return "Ok"


@app.route('/to-keyboard/<label_name>')
def send_to_keyboard(label_name):
    print(generate.generate_password(), label_name)
    # TODO Decrypt Password assotiated with the Label name and send it to the keyboard
    # coms.send_message("THIS IS A PASSWORD")
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

