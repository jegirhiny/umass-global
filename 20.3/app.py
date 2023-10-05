from flask import Flask, session, request, flash, render_template, redirect
from surveys import *

app = Flask(__name__)

app.secret_key = 'jegirhiny'

satisfaction_survey = Survey(
    "Customer Satisfaction Survey",
    "Please fill out a survey about your experience with us.",
    [
        Question("Have you shopped here before?"),
        Question("Did someone else shop with you today?"),
        Question("On average, how much do you spend a month on frisbees?",
                 ["Less than $10,000", "$10,000 or more"]),
        Question("Are you likely to shop here again?"),
    ])

@app.route('/')
def start_page():
    session['responses'] = []

    title = satisfaction_survey.title
    instructions = satisfaction_survey.instructions

    return render_template('start.html', title = title, instructions = instructions)

@app.route('/questions/<question_index>')
def question(question_index):
    question_length = len(satisfaction_survey.questions)

    if not question_index.isnumeric() or int(question_index) != len(session['responses']) or int(question_index) >= question_length or int(question_index) < 0:
        flash("Invalid question number. Please try a valid question.", 'error')
        return redirect(f'/questions/{len(session.get("responses", []))}')

    question = satisfaction_survey.questions[int(question_index)]

    return render_template('question.html', question = question, question_index = question_index)

@app.route('/answer', methods=['POST'])
def answer():
    answer = request.form['answer']
    responses = session.get('responses', [])
    responses.append(answer)
    session['responses'] = responses

    question_index = len(session['responses'])

    if question_index < len(satisfaction_survey.questions):
        return redirect(f'/questions/{question_index}')

    return render_template('end.html')
