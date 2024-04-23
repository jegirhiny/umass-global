from flask import Flask, render_template, redirect, request
from models import db, connect_db, Pet

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:user@localhost:5432/umass-global'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

connect_db(app)

@app.route('/')
def toUsers():
    return redirect('/users')

if __name__ == '__main__':
    app.run(debug=True)