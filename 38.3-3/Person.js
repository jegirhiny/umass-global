const Person = ({ name, age, hobbies }) => {
    return (
        <div>
            <p>Learn some information about this person.</p>
            {age >= 18 ? <h3>Please go vote!</h3> :  <h3>You must be 18</h3>}
            {name.length > 8 ? <h3>{name.substring(0, 7)}</h3> :  <h3>{name}</h3>}
            <ul>{hobbies.map((hobby, index) => <li key={index}>{hobby}</li>)}</ul>
        </div>
    )
}