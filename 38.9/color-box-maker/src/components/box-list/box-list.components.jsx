import React, { useState } from 'react';
import NewBoxForm from '../new-box-form/new-box-form.components';
import Box from '../box/box.components';
import './box-list.styles.css';

const BoxList = () => {
    const [ boxes, setBox ] = useState([]);

    const addBox = (formData) => {
        setBox([...boxes, <Box key={Date.now()} color={formData.color} width={formData.width} height={formData.height} />]);
    }

    return (
        <div className='container'>
            <NewBoxForm addBox={addBox} />
            <div className='box-cotainer'>
                {boxes}
            </div>
        </div>
    );
}

export default BoxList;