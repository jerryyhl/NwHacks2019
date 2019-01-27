import random
chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'

def generate_password():
    password = ''
    for c in range(10):
        password += random.choice(chars)
    return password