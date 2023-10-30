import '../pokecard/pokecard.styles.css';

const Pokecard = ({ id, name, type, experience }) => {
    return (
        <div className="pokecard">
            <h1>{name}</h1>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={`Pokemon #${id}`} />
            <h3>{`Type: ${type}`}</h3>
            <h3>{`EXP: ${experience}`}</h3>
        </div>
    )
}

export default Pokecard;