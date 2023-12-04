import "./color-factory.styles.css";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const ColorFactory = ({ colors }) => {
    return (
        <Fragment>
            <div className="header">
                <h2 className="head-title">Welcome to the Color Factory</h2>
                <Link className="link" to='/colors/new'>Add a Color</Link>
            </div>
            <div className="footer">
                <h2 className="foot-title">Select a Color: </h2>
                {colors.map((color, index) => <Link key={index} className="color" to={`/colors/${color.name}`}>{ color.name }</Link>)}
            </div>
        </Fragment>
    );
}

export default ColorFactory;