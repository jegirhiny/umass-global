from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

    with app.app_context():
        db.create_all()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, default='')

    def __repr__(self):
        return f"<User id={self.id}, first_name={self.first_name}, last_name={self.last_name}, image_url={self.image_url}>"
    
class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship("User", backref="posts")
    tags = db.relationship("Tag", secondary="postTags", backref="posts")

    def __repr__(self):
        return f"<Post id={self.id}, title={self.title}, content={self.content}, created_at={self.created_at}, user_id={self.user_id}>"
    
class PostTag(db.Model):
    __tablename__ = 'postTags'

    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key=True, nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True, nullable=False)

    def __repr__(self):
        return f"<PostTag post_id={self.post_id}, tag_id={self.tag_id}>"
    
class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"<Tag id={self.id}, name={self.name}>"