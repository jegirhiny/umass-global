import './box.styles.css';

const Box = ({ id, color, width, height, removeBox }) => {
    return (
        <div className='outer-box'>
            <div style={{ backgroundColor: color, width: `${width}px`, height: `${height}px` }}/>
            <button onClick={() => removeBox(id)}>X</button>
        </div>
    );
}

export default Box;