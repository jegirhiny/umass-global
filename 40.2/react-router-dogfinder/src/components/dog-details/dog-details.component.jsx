import './dog-details.styles.css'
import { useParams } from 'react-router-dom';

const DogDetails = ({ dogs }) => {
    const { name } = useParams();
    const dog = dogs.find(dog => dog.name === name);

    return (
        <div className='details'>
            <img src={ dog.src } alt={ dog.name } className='full-img'/>
            <div className='info'>
                <div className='basic-info'>
                    <h2>{ dog.name }</h2>
                    <h2>{ dog.age }</h2>
                </div>
                <div className='extra-info'>
                    <ul>
                        {dog.facts.map(fact => <li>{ fact }</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DogDetails;