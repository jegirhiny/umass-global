import './dog-details.styles.css'
import { useLocation  } from 'react-router-dom';

const DogDetails = () => {
    const { state } = useLocation();
    const dog = state.dog;

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