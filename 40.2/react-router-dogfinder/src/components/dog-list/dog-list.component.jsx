import './dog-list.styles.css';
import { useNavigate } from 'react-router-dom';

const DogList = ({ dogs }) => {
    const navigate = useNavigate();
  
    const handleClick = (e) => {
        const name = e.target.closest('.dog-item').getAttribute('name');
        navigate(`/dogs/${name}`);
    };

    return (
        <div className='dog-container'>
            {dogs.map((dog, index) => {
                return (
                    <div key={index} className='dog-item' onClick={handleClick} name={dog.name}>
                        <img src={dog.src} alt={dog.name} className='prev-img' />
                        <div className='info-primary'>
                            <h2>{dog.name}</h2>
                        </div>
                    </div>
                );
            })}
        </div>
    );
  };

export default DogList;