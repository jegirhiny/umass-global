import { useState } from 'react';
import './new-todo-form.styles.css';

const NewTodoForm = ({ addTodo }) => {
    const [ text, setText ] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(text === '') {
            return;
        }

        addTodo(text);
        setText('');
    }

    const onChangeHandler = (e) => {
        setText(e.target.value);
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <input type="text" value={text} placeholder='Enter Todo Text' onChange={onChangeHandler}/>
            <button className='form-button'>Submit</button>
        </form>
    );
}

export default NewTodoForm;