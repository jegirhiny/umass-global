from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

    with app.app_context():
        db.create_all()

class Pet(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    species = db.Column(db.String, nullable=False)
    photo_url = db.Column(db.String, nullable=True)
    age = db.Column(db.Integer, nullable=True) 
    notes = db.Column(db.String, nullable=True)
    available = db.Column(db.Boolean, default=True, nullable=True)

    def __repr__(self):
        return f'<Pet id={self.id}, name={self.name}, species={self.species}, age={self.age}, available={self.available}>'