from flask import Flask, jsonify, session, request, flash, render_template, redirect
from boggle import Boggle

app = Flask(__name__)
app.secret_key = 'jegirhiny'

boggle_game = Boggle()

@app.route('/')
def landing_page():
    """
    Renders the landing page that displays the Boggle game board.

    Returns:
    A rendered HTML template with the game board, games played, and high score.
    """
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
    """
    Validates a word submitted by the user by checking certain parameters.

    Returns:
    A JSON response indicating if the word is valid.
    """
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
    """
    Update game statistics, including the number of games played and the high score achieved by the player.

    Returns:
    A JSON response with the updated games played, if a new high score was achieved, and current high score.
    """
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
    """
    Restarts the Boggle game by generating a new game board and updates the session data.

    Returns:
    A JSON response with the updated game board.
    """
    session['board'] = boggle_game.make_board()

    return jsonify({'board': session['board']})