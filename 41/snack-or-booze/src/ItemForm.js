import React, { useState } from "react";
import {Card, CardBody} from "reactstrap";
import axios from "axios";

const ItemForm = () => {
    const [formData, setFormData] = useState({
        selection: 'Food',
        name: '',
        description: '',
        recipe: '',
        serve: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        let url;
    
        if (formData.selection === 'Food') {
            url = 'http://localhost:5000/snacks';
        } else if (formData.selection === 'Drink') {
            url = 'http://localhost:5000/drinks';
        }
    
        const id = formData.name.toLowerCase();
        const data = { id: id, name: formData.name, description: formData.description, recipe: formData.recipe, serve: formData.serve };
    
        axios.post(url, data)
            .then(response => {
                console.log('New item created:', response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <section className="col-md-4">
        <Card>
          <CardBody>
            <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit}>
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <div>
                        <input type="radio" name="selection" value="Food" onChange={handleChange} checked />
                        <label htmlFor="button1">Food</label>
                    </div>
                    <div>
                        <input type="radio" name="selection" value="Drink" onChange={handleChange}/>
                        <label htmlFor="button2">Drink</label>
                    </div>
                </div>

                <input type="text" placeHolder="Name" name="name" required={true} onChange={handleChange}/>
                <input type="text" placeHolder="Description" name="description" required={true} onChange={handleChange}/>
                <input type="text" placeHolder="Recipe" name="recipe" required={true} onChange={handleChange}/>
                <input type="text" placeHolder="Serve" name="serve" required={true} onChange={handleChange}/>

                <button>Create</button>
            </form>
          </CardBody>
        </Card>
      </section>
    );
}

export default ItemForm;