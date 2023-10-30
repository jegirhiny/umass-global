import '../pokedex/pokedex.styles.css';
import Pokecard from "../pokecard/pokecard.component";
import React from "react";

const Pokedex = ({ list }) => {
    return (
        <div className="container">
            {list.map((card) => <Pokecard id={card.id} name={card.name} type={card.type} experience={card.base_experience}/>)}
        </div>
    )
}

export default Pokedex;