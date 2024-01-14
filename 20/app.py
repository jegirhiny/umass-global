import requests
from flask import Flask, request, render_template

ACCESS_KEY = "ed6417766bff0bc28cb45ab9fadae011"
BASE_API = "http://api.exchangerate.host"
LIST_ENDPOINT = "/list"
CONVERT_ENDPOINT = "/convert"

app = Flask(__name__)

@app.route('/', methods=['GET'])
def landing():
    return render_template('form.html')


@app.route('/result', methods=['GET'])
def result():
    from_currency = request.args['from_currency'].upper()
    to_currency = request.args['to_currency'].upper()
    amount = float(request.args['amount'])

    currency_res = requests.get(f"{BASE_API}{LIST_ENDPOINT}?access_key={ACCESS_KEY}")
    currency_list = currency_res.json()["currencies"]

    errors = []

    if (from_currency not in currency_list):
        errors.append(f"Invalid Currency: {from_currency}")
    
    if (to_currency not in currency_list):
        errors.append(f"Invalid Currency: {to_currency}")

    if (amount < 0):
        errors.append(f"Invalid Amount: {amount}")

    if len(errors) > 0:
        return render_template('form.html', from_currency = from_currency, to_currency = to_currency, amount = float(amount), errors = errors)

    convert_res = requests.get(f"{BASE_API}{CONVERT_ENDPOINT}?access_key={ACCESS_KEY}&from={from_currency}&to={to_currency}&amount={amount}")
    result = convert_res.json()["result"]

    return render_template('result.html', result = round(result, 2), to_currency = to_currency)