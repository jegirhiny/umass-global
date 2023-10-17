from flask import Flask, jsonify, session, request, flash, render_template, redirect
from boggle import Boggle

app = Flask(__name__)
app.secret_key = 'jegirhiny'

boggle_game = Boggle()

@app.route('/')
def landing_page():
    if 'board' not in session:
        session['board'] = boggle_game.make_board()

    return render_template('board.html', board = session['board'])

@app.route('/validate_word', methods=['POST'])
def validate_word():
    word = request.get_json()['word']

    if not word:
        return jsonify({'result': 'not-a-word'})

    valid_word = boggle_game.check_valid_word(session['board'], word)

    return jsonify({'result': 'ok'})

    # if valid_word:
    #     on_board = boggle_game.find(session['board'], word)

    #     if on_board:
    #         return jsonify({'result': 'ok'})
    #     else:
    #         return jsonify({'result': 'not-on-board'})

    # return jsonify({'result': 'not-a-word'})