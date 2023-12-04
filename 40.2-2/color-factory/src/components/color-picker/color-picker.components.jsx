import "./color-picker.styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ColorPicker = ({ fetchData }) => {
    const navigate = useNavigate();
    const [ data, setData ] = useState({
        name: 'Black',
        color: '#000000'
    });

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData(data);
        navigate(`/colors`);
    }

    return (
        <div className="color-background">
            <form className="color-form" onSubmit={handleSubmit}>
                <div className="tb-margin">
                    <label htmlFor='color-name'>Color Name</label>
                    <input id="color-name" name="name" type="text" onChange={handleChange}/>
                </div>
                <div className="tb-margin">
                    <label htmlFor='color-val'>Color Value</label>
                    <input id="color-val" name="color" type='color' onChange={handleChange}/>
                </div>
                <input className="tb-margin" type='submit' />
            </form>
        </div>
    );
}

export default ColorPicker;