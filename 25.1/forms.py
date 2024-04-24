from flask_wtf import FlaskForm;
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, URL, NumberRange, AnyOf, Optional

class AddPetForm(FlaskForm):
    """Form for adding a new Pet."""

    name = StringField('Name', validators=[DataRequired()])
    species = StringField('Species', validators=[DataRequired(), AnyOf(['cat', 'dog', 'porcupine'], message='Species must be cat, dog, or porcupine')])
    photo_url = StringField('Photo URL', validators=[Optional(), URL(require_tld=False, message='Invalid URL')])
    age = IntegerField('Age', validators=[Optional(), NumberRange(min=0, max=30, message='Age must be between 0 and 30')])
    notes = StringField('Notes')
    available = BooleanField('Available', default=True)

class EditPetForm(FlaskForm):
    """Form for editing a Pet."""

    photo_url = StringField('Photo URL', validators=[Optional(), URL(require_tld=False, message='Invalid URL')])
    notes = StringField('Notes')
    available = BooleanField('Available', default=True)