from flask import Flask, request
from operations import *

app = Flask(__name__)

@app.route('/math/<math_type>')
def calc(math_type):
    a = float(request.args['a'])
    b = float(request.args['b'])

    if math_type == 'add':
        return str(add(a, b))
    elif math_type == 'sub':
        return str(sub(a, b))
    elif math_type == 'mult':
        return str(mult(a, b))
    elif math_type == 'div':
        return str(div(a, b))
    
    return 'Unknown Math Type'