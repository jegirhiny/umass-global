from flask import Flask, render_template, redirect, request
from models import db, connect_db, User, Post

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:user@localhost:5432/umass-global'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

connect_db(app)

@app.route('/')
def toUsers():
    return redirect('/users')

@app.route('/users')
def users():
    users = User.query.all()

    return render_template('users.html', users = users)

@app.route('/users/new')
def userForm():
    return render_template('newUserForm.html')

@app.route('/users/new', methods=['POST'])
def handleUserNew():
    first_name = request.form.get('firstName')
    last_name = request.form.get('lastName')
    image_url = request.form.get('imageUrl')
    new_user = User(first_name=first_name, last_name=last_name, image_url=image_url)

    db.session.add(new_user)
    db.session.commit()
    
    return redirect('/users')

@app.route('/users/<user_id>')
def userDetails(user_id):
    user = User.query.filter_by(id = user_id).first()
    posts = Post.query.filter_by(user_id = user_id).all()

    return render_template('userDetails.html', user = user, posts = posts)

@app.route('/users/<user_id>/edit')
def userEdit(user_id):
    return render_template('editUserForm.html', user_id = user_id)

@app.route('/users/<user_id>/edit', methods=['POST'])
def handleUserEdit(user_id):
    user = User.query.filter_by(id = user_id).first()
    user.first_name = request.form.get('firstName')
    user.last_name = request.form.get('lastName')
    user.image_url = request.form.get('imageUrl')
    db.session.commit()

    return redirect('/users')

@app.route('/users/<user_id>/delete', methods=['POST'])
def deleteUser(user_id):
    User.query.filter_by(id = user_id).delete()
    db.session.commit()

    return redirect('/users')

@app.route('/users/<user_id>/posts/new')
def postNew(user_id):
    user = User.query.filter_by(id = user_id).first()

    return render_template('newPostForm.html', user = user)

@app.route('/users/<user_id>/posts/new', methods=['POST'])
def handePostNew(user_id):
    title = request.form.get('title')
    content = request.form.get('content')
    new_post = Post(title=title, content=content, user_id=user_id)

    db.session.add(new_post)
    db.session.commit()

    return redirect(f'/users/{user_id}')

@app.route('/posts/<post_id>')
def postGet(post_id):
    post = Post.query.filter_by(id = post_id).first()
    user = User.query.filter_by(id = post.user_id).first()

    return render_template('postDetails.html', post = post, user = user)

@app.route('/posts/<post_id>/edit')
def postEdit(post_id):
    return render_template('editPostForm.html', post_id = post_id)

@app.route('/posts/<post_id>/edit', methods=['POST'])
def handlePostEdit(post_id):
    post = Post.query.filter_by(id = post_id).first()
    post.title = request.form.get('title')
    post.content = request.form.get('content')
    db.session.commit()

    return redirect('/users')

@app.route('/posts/<post_id>/delete', methods=['POST'])
def deletePost(post_id):
    Post.query.filter_by(id = post_id).delete()
    db.session.commit()

    return redirect('/users')

if __name__ == '__main__':
    app.run(debug=True)