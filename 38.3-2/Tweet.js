const Tweet = ({ username, name, date, message }) => {
    return (
        <ul className='tweet'>
            <li className='username'>{username}</li>
            <li className='name'>{name}</li>
            <li className='date'>{date}</li>
            <li className='message'>{message}</li>
        </ul>
    )
}