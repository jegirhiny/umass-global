from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/')
def landing_form():
    return render_template('form.html')