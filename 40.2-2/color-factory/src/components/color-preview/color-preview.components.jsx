import "./color-preview.styles.css";
import { useParams, Link } from "react-router-dom";

const ColorPreview = ({ colors }) => {
    const { color: colorName } = useParams();
    const color = colors.find(c => c.name === colorName);

    return (
        <div className="preview" style={{ backgroundColor: color.color }}>
            <h2 className="prev-text">THIS IS {color.name}</h2>
            <Link className="prev-link" to='/colors'>GO BACK</Link>
        </div>
    );
};

export default ColorPreview;