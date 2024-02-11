import { useLocation, Link } from "react-router-dom";
import './story.styles.css';

const Story = () => {
    const { state } = useLocation();
    const { noun, noun2, adj, color } = state.data;

    return (
        <div>
            <h2>{`There was a ${color} ${noun} who loved a ${adj} ${noun2}.`}</h2>
            <Link to="/">Restart</Link>
        </div>
    )
}

export default Story;