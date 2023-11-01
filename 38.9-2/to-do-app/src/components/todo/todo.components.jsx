import { useState } from 'react';
import './todo.styles.css';

const Todo = ({ text }) => {
    const [ display, setDisplay ] = useState(true);

    if(!display) {
        return null;
    }

    return (
        <div className='container'>
            <h3>{ text }</h3>
            <button onClick={() => setDisplay(false)}>X</button>
        </div>
    );
}

export default Todo;