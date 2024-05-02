from flask import Flask, jsonify, render_template, request
from models import db, connect_db, Cupcake
from static.static import serialize_cupcake

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:user@localhost:5432/umass-global'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'SECRET_KEY'

connect_db(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/cupcakes')
def getAllCupcakes():
    return jsonify(cupcakes = [serialize_cupcake(cupcake) for cupcake in Cupcake.query.all()])

@app.route('/api/cupcakes', methods=['POST'])
def createCupcake():
    data = request.json
    image = 'https://tinyurl.com/demo-cupcake' if 'image' not in data or data['image'] == '' else data['image']

    cupcake = Cupcake(flavor = data['flavor'], size = data['size'], rating = data['rating'], image = image)
    db.session.add(cupcake)
    db.session.commit()

    return jsonify(cupcake = serialize_cupcake(Cupcake.query.get(cupcake.id)))

@app.route('/api/cupcakes/<id>')
def getCupcake(id):
    cupcake = Cupcake.query.get(id)

    if cupcake is None:
        return jsonify({'error': 'Cupcake not found'}), 404
    
    return jsonify(cupcake = serialize_cupcake(cupcake))

@app.route('/api/cupcakes/<id>', methods=['PATCH'])
def editCupcake(id):
    data = request.json
    cupcake = Cupcake.query.get(id)

    cupcake.flavor = data['flavor']
    cupcake.size = data['size']
    cupcake.rating = data['rating']
    cupcake.image = data['image']

    db.session.commit()
    
    return jsonify(cupcake = serialize_cupcake(cupcake))

@app.route('/api/cupcakes/<id>', methods=['DELETE'])
def deleteCupcake(id):
    cupcake = Cupcake.query.get(id)

    if cupcake is None:
        return jsonify({'error': 'Cupcake not found'}), 404
    
    db.session.delete(cupcake)
    db.session.commit()
    
    return jsonify({'message' : "Deleted"})

if __name__ == '__main__':
    app.run(debug=True)