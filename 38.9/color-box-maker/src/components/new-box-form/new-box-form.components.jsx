import { useState } from 'react';
import './new-box-form.styles.css';

const NewBoxForm = ({ addBox }) => {
    const [ formData, setFormData ] = useState({
        width: '',
        height: '',
        color: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if(formData.width === '' || formData.height === '' || formData.color === '') {
            return;
        }

        addBox(formData);
        setFormData({ width: '', height: '', color: '' });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" name='width' value={formData.width} placeholder='Enter Box Width' onChange={handleInputChange}/>
            <input type="number" name='height' value={formData.height} placeholder='Enter Box Height' onChange={handleInputChange}/>
            <input type="text" name='color' value={formData.color} placeholder='Enter Box Color' onChange={handleInputChange}/>
            <button>Submit</button>
        </form>
    );
}

export default NewBoxForm;