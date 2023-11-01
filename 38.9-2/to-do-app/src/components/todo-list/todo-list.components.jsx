import { useState } from 'react';
import './todo-list.styles.css';
import Todo from '../todo/todo.components';
import NewTodoForm from '../new-todo-form/new-todo-form.component';

const TodoList = () => {
    const [ todoList, setTodoList ] = useState([]);

    const addTodo = (text) => {
        setTodoList([...todoList, <Todo key={Date.now()} text={text.toUpperCase()}></Todo>])
    }

    return (
        <div className='todo-container'>
            <NewTodoForm addTodo={addTodo} />
            {todoList}
        </div>
    );
}

export default TodoList;