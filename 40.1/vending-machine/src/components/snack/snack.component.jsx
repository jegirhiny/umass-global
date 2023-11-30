import "./snack.styles.css";
import { Link } from "react-router-dom";

const Snack = ({ url }) => {
    return (
        <div className="snack" style={{ backgroundImage: `url(${url})` }}>
            <Link className="link" to="/">GO BACK</Link>
        </div>
    );
};

export default Snack;