import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './form.styles.css';

const Form = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ noun: '', noun2: '', adj: '', color: '' });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setData({ ...data, [name]: value });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        navigate('/story', { state: { data : data }});
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <input type="text" placeholder='noun' value={data.noun} name='noun' onChange={onChangeHandler} />
            <input type="text" placeholder='noun 2' value={data.noun2} name='noun2' onChange={onChangeHandler} />
            <input type="text" placeholder='adjective' value={data.adj} name='adj' onChange={onChangeHandler} />
            <input type="text" placeholder='color' value={data.color} name='color' onChange={onChangeHandler} />
            <button type="submit">Get Story</button>
        </form>
    )
}

export default Form;