import './todo.styles.css';

const Todo = ({ text , deleteTodo }) => {
    return (
        <div className='container'>
            <h3>{ text }</h3>
            <button onClick={() => deleteTodo(text)}>X</button>
        </div>
    );
}

export default Todo;