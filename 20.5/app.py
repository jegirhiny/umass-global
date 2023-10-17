from flask import Flask, jsonify, session, request, flash, render_template, redirect
from boggle import Boggle

app = Flask(__name__)
app.secret_key = 'jegirhiny'

boggle_game = Boggle()

@app.route('/')
def landing_page():
    if 'board' not in session:
        session['board'] = boggle_game.make_board()

    if 'games_played' not in session:
        session['games_played'] = 1

    if 'high_score' not in session:
        session['high_score'] = 0

    return render_template('board.html', 
        board = session['board'], 
        games_played = session['games_played'], 
        high_score = session['high_score']
    )

@app.route('/validate_word', methods=['POST'])
def validate_word():
    word = request.get_json()['word']

    if not word:
        return jsonify({'result': 'not-a-word'})

    valid_word = boggle_game.check_valid_word(session['board'], word)

    if valid_word:
        on_board = boggle_game.find(session['board'], word)

        if on_board:
            return jsonify({'result': 'ok'})
        else:
            return jsonify({'result': 'not-on-board'})

    return jsonify({'result': 'not-a-word'})

@app.route('/update_statistics', methods=['POST'])
def update_statistics():
    score = request.get_json()['score']

    session['games_played'] += 1

    if session['high_score'] < score:
        session['high_score'] = score

    return jsonify({
        'played': session['games_played'], 
        'newHighScore': session['high_score'] < score, 
        'highScore': session['high_score']
    })

@app.route('/restart_game', methods=['GET'])
def restart_game():
    session['board'] = boggle_game.make_board()

    return jsonify({'board': session['board']})