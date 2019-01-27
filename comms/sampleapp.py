from flask import Flask, request, send_from_directory

import coms
import generate

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_folder='static')


locked = True

PASSWORD = "1234"


@app.route('/static')
def send_file(filename):
    return send_from_directory(app.static_folder, filename)


@app.route('/get-all-labels')
def get_all_labels():
    return ["Microsoft", "Google", "Amazon"]


@app.route('/generate/<label_name>')
def generate_password(label_name):
    print(generate.generate_password(), label_name)
    # TODO Encrypt New Generated Password and Save it.
    return "Ok"


@app.route('/to-keyboard/<label_name>')
def send_to_keyboard (label_name):
    print(generate.generate_password(), label_name)
    # TODO Decrypt Password assotiated with the Label name and send it to the keyboard
    coms.send_message("THIS IS A PASSWORD")
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

