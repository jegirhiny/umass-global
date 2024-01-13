import requests
from flask import Flask, request, render_template

ACCESS_KEY = "ed6417766bff0bc28cb45ab9fadae011"

app = Flask(__name__)

@app.route('/')
def landing():
    return render_template('form.html')


@app.route('/result')   
def result():
    from_currency = request.args['from_currency'].upper()
    to_currency = request.args['to_currency'].upper()
    amount = float(request.args['amount'])

    currencyRes = requests.get(f"http://api.exchangerate.host/list?access_key={ACCESS_KEY}")
    currencyList = currencyRes.json()["currencies"]

    if(from_currency not in currencyList and to_currency not in currencyList) :
        return render_template('form.html', from_currency = from_currency, to_currency = to_currency, amount = float(amount), errors = [f"Invalid Currency: {from_currency}", f"Invalid Currency: {to_currency}"])
    elif (from_currency not in currencyList) :
        return render_template('form.html', from_currency = from_currency, to_currency = to_currency, amount = float(amount), errors = [f"Invalid Currency: {from_currency}"])
    elif (to_currency not in currencyList) :
        return render_template('form.html', from_currency = from_currency, to_currency = to_currency, amount = float(amount), errors = [f"Invalid Currency: {to_currency}"])

    convertRes = requests.get(f"http://api.exchangerate.host/convert?access_key={ACCESS_KEY}&from={from_currency}&to={to_currency}&amount={amount}")
    result = convertRes.json()["result"]

    return render_template('result.html', result = round(result, 2))