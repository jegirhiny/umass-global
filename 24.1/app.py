from flask import Flask, render_template, redirect, request
from models import db, connect_db, User

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:user@localhost:5432/sqlalchemy-p1'
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
def userNew():
    first_name = request.form.get('firstName')
    last_name = request.form.get('lastName')
    image_url = request.form.get('imageUrl')
    new_user = User(first_name=first_name, last_name=last_name, image_url=image_url)

    db.session.add(new_user)
    db.session.commit()
    
    return redirect('/')

@app.route('/users/<user_id>')
def userDetails(user_id):
    user = User.query.filter_by(id = user_id).first()
    return render_template('userDetails.html', user = user)

@app.route('/users/<user_id>/edit')
def userEdit(user_id):
    return render_template('editUserForm.html', user_id = user_id)

@app.route('/users/<user_id>/edit', methods=['POST'])
def edit(user_id):
    user = User.query.filter_by(id = user_id).first()
    user.first_name = request.form.get('firstName')
    user.last_name = request.form.get('lastName')
    user.image_url = request.form.get('imageUrl')
    db.session.commit()

    return redirect('/users')

@app.route('/users/<user_id>/delete', methods=['POST'])
def delete(user_id):
    User.query.filter_by(id = user_id).delete()
    db.session.commit()

    return redirect('/users')

if __name__ == '__main__':
    app.run(debug=True)