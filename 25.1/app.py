from flask import Flask, render_template, redirect
from models import db, connect_db, Pet
from forms import AddPetForm, EditPetForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:user@localhost:5432/umass-global'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'SECRET_KEY'

connect_db(app)

@app.route('/')
def showPets():
    pets = Pet.query.all()

    return render_template('pets.html', pets = pets)

@app.route('/add')
def addPet():
    form = AddPetForm()

    return render_template('addPet.html', form = form)

@app.route('/add', methods=['POST'])
def handleAddPet():
    form = AddPetForm()

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data
        available = form.available.data

        pet = Pet(name = name, species = species, photo_url = photo_url, age = age, notes = notes, available = available)
        db.session.add(pet)
        db.session.commit()

        return redirect('/')
    else:
        return render_template('addPet.html', form=form)
    
@app.route('/<id>')
def showPetDetails(id):
    pet = Pet.query.filter_by(id = id).first()
    form = EditPetForm(obj = pet)
    
    return render_template('petDetails.html', pet = pet, form = form)

@app.route('/<id>', methods=['POST'])
def handlePetEdit(id):
    pet = Pet.query.filter_by(id = id).first()
    form = EditPetForm(obj = pet)

    if form.validate_on_submit():
        form.populate_obj(pet)
        db.session.commit()
        return redirect('/')
    else:
        return render_template('petDetails.html', pet = pet, form = form)

if __name__ == '__main__':
    app.run(debug=True)