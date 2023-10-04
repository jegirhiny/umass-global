from flask import Flask, request, render_template
from stories import *

app = Flask(__name__)

story = Story(
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural_noun}."""
)

@app.route('/')
def landing_form():
    return render_template('form.html', prompts = story.prompts)

@app.route('/story', methods=['GET'])
def story_page():
    return render_template('story.html', story = story.generate(request.args))