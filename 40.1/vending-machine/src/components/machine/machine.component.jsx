import "./machine.styles.css";
import { Link } from "react-router-dom";

const Machine = () => {
    return (
        <div className="machine">
            <div className="content">
                <Link className="item" to="/popcorn">Popcorn</Link>
                <Link className="item" to="/chips">Chips</Link>
                <Link className="item" to="/cheetos">Cheetos</Link>
            </div>
        </div>
    )
}

export default Machine;