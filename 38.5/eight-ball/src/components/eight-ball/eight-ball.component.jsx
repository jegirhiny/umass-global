import './eight-ball.styles.css';
const { useState } = require("react")

const EightBall = ({ answers }) => {
    const [ color, setColor ] = useState('black');
    const [ msg, setMsg ] = useState('Think of a Question');

    const getMessage = () => {
        let message = answers[Math.floor(Math.random() * answers.length)];

        setColor(message.color);
        setMsg(message.msg);
    }

    return (
        <div className='container' style={{ backgroundColor: color }} onClick={getMessage}>
            <h3>{msg}</h3>
        </div>
    )
}

export default EightBall;