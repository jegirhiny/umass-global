from flask import Flask, request, render_template
from stories import *

app = Flask(__name__)

stories = [
    Story(["place", "noun", "verb", "adjective", "plural_noun"], """Once upon a time in a long-ago {place}, there lived a large {adjective} {noun}. It loved to {verb} {plural_noun}."""),
    Story(["place", "noun", "verb", "plural_noun"], """Once upon a time in a long-ago {place}, there lived a large {noun}. It loved to {verb} {plural_noun}."""),
    Story(["place", "noun", "adjective"], """Once upon a time in a long-ago {place}, there lived a large {adjective} {noun}."""),
    Story(["place", "noun", "verb"], """Once upon a time in a long-ago {place}, there lived a large{noun}. It loved to {verb}.""")
]

@app.route('/')
def menu():
    return render_template('menu.html', stories = stories)

@app.route('/form', methods=['GET'])
def landing_form():
    selected_story = int(request.args['selected_story']) - 1

    return render_template('form.html', prompts = stories[selected_story].prompts, selected_story = selected_story)

@app.route('/story', methods=['GET'])
def story_page():
    selected_story = int(request.args['selected_story'])
    prompt_values = {key: request.args.get(key, '') for key in stories[selected_story].prompts}

    return render_template('story.html', story = stories[selected_story].generate(prompt_values))