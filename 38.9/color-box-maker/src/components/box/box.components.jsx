import React, { useState } from 'react';
import './box.styles.css';

const Box = ({ color, width, height }) => {
    const [ display, setDisplay ] = useState(true);

    if(!display) {
        return null;
    }

    return (
        <div className='outer-box'>
            <div style={{ backgroundColor: color, width: `${width}px`, height: `${height}px` }}/>
            <button onClick={() => setDisplay(false)}>X</button>
        </div>
    );
}

export default Box;