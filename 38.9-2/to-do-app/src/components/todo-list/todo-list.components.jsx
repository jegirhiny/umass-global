import { useState } from 'react';
import Todo from '../todo/todo.components';
import NewTodoForm from '../new-todo-form/new-todo-form.component';
import './todo-list.styles.css';

const TodoList = () => {
    const [ todoList, setTodoList ] = useState([]);

    const addTodo = (text) => {
        const found = todoList.find((todoText) => todoText === text);

        if(found) {
            return;
        }

        setTodoList([...todoList, text]);
    }

    const deleteTodo = (text) => {
        setTodoList(todoList.filter((todoText) => todoText !== text));
    }

    return (
        <div className='todo-container'>
            <NewTodoForm addTodo={addTodo} />
            {todoList.map((text, index) => <Todo key={index} text={text} deleteTodo={deleteTodo}/>)}
        </div>
    );
}

export default TodoList;