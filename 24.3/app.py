from flask import Flask, render_template, redirect, request
from models import db, connect_db, User, Post, PostTag, Tag
from sqlalchemy import join

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:user@localhost:5432/umass-global'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

connect_db(app)



# 24.1 ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- 

@app.route('/')
def toUsers():
    return redirect('/users')

@app.route('/users')
def showUsers():
    users = User.query.all()

    return render_template('users.html', users = users)

@app.route('/users/new')
def newUserForm():
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
def showUserDetails(user_id):
    user = User.query.filter_by(id = user_id).first()
    posts = Post.query.filter_by(user_id = user_id).all()

    return render_template('userDetails.html', user = user, posts = posts)

@app.route('/users/<user_id>/edit')
def editUserForm(user_id):
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
def handleUserDelete(user_id):
    User.query.filter_by(id = user_id).delete()
    db.session.commit()

    return redirect('/users')



# 24.2 ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- 

@app.route('/users/<user_id>/posts/new')
def newPostForm(user_id):
    user = User.query.filter_by(id = user_id).first()
    tags = Tag.query.all()

    return render_template('newPostForm.html', user = user, tags = tags)

@app.route('/users/<user_id>/posts/new', methods=['POST'])
def handleNewPost(user_id):
    title = request.form.get('title')
    content = request.form.get('content')
    new_post = Post(title=title, content=content, user_id=user_id)

    db.session.add(new_post)
    db.session.commit()

    box_inputs = [key for key, value in request.form.items() if value == 'on']

    for tag_id in box_inputs:
        db.session.add(PostTag(post_id = new_post.id, tag_id = int(tag_id)))
        db.session.commit()

    return redirect(f'/users/{user_id}')

@app.route('/posts/<post_id>')
def showPost(post_id):
    post = Post.query.filter_by(id = post_id).first()
    user = User.query.filter_by(id = post.user_id).first()
    tags = db.session.query(Tag).join(PostTag).filter(PostTag.post_id == post_id).all()

    return render_template('postDetails.html', post = post, user = user, tags = tags)

@app.route('/posts/<post_id>/edit')
def editPostForm(post_id):
    return render_template('editPostForm.html', post_id = post_id, tags = Tag.query.all())

@app.route('/posts/<post_id>/edit', methods=['POST'])
def handlePostEdit(post_id):
    post = Post.query.filter_by(id=post_id).first()
    post.title = request.form.get('title')
    post.content = request.form.get('content')
    PostTag.query.filter_by(post_id=post_id).delete()

    box_inputs = [key for key, value in request.form.items() if value == 'on']
    
    for tag_id in box_inputs:
        db.session.add(PostTag(post_id=post_id, tag_id=int(tag_id)))

    db.session.commit()

    return redirect('/users')

@app.route('/posts/<post_id>/delete', methods=['POST'])
def handlePostDelete(post_id):
    Post.query.filter_by(id = post_id).delete()
    db.session.commit()

    return redirect('/users')



# 24.3 ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- 

@app.route('/tags/new')
def newTagForm():
    return render_template('newTag.html')

@app.route('/tags/new', methods=['POST'])
def handleTagNew():
    db.session.add(Tag(name = request.form.get('name')))
    db.session.commit()

    return redirect('/tags')

@app.route('/tags/<tag_id>/edit')
def editTagForm(tag_id):
    return render_template('editTag.html', tag_id = tag_id)

@app.route('/tags/<tag_id>/edit', methods=['POST'])
def handleTagEdit(tag_id):
    tag = Tag.query.filter_by(id = tag_id).first()
    tag.name = request.form.get('name')
    db.session.commit()

    return redirect('/tags')

@app.route('/tags/<tag_id>/delete', methods=['POST'])
def handleTagDelete(tag_id):
    Tag.query.filter_by(id = tag_id).delete()
    db.session.commit()

    return redirect('/tags')

@app.route('/tags')
def tags():
    return render_template('tagList.html', tags = Tag.query.all())

@app.route('/tags/<tag_id>')
def showTagDetails(tag_id):
    tag = Tag.query.filter_by(id = tag_id).first()
    posts = Post.query.join(PostTag).filter(PostTag.tag_id == tag_id).all()

    return render_template('tagDetails.html', tag=tag, posts=posts)

if __name__ == '__main__':
    app.run(debug=True)