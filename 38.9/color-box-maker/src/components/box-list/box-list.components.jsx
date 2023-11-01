import React, { useState } from 'react';
import NewBoxForm from '../new-box-form/new-box-form.components';
import Box from '../box/box.components';
import './box-list.styles.css';

const BoxList = () => {
    const [ boxes, setBox ] = useState([]);

    const addBox = (formData) => {
        setBox([...boxes, formData]);
    }

    const removeBox = (id) => {
        setBox(boxes.filter((formData, index) => index !== id))
    }

    return (
        <div className='container'>
            <NewBoxForm addBox={addBox} />
            <div className='box-cotainer'>
                {boxes.map((formData, index) => 
                    <Box key={index} id={index} color={formData.color} width={formData.width} height={formData.height} removeBox={removeBox} />
                )}
            </div>
        </div>
    );
}

export default BoxList;