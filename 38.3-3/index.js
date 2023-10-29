const App = () => {
    return (
        <div>
            <Person name='John Doe' age={25} hobbies={['Reading', 'Hiking', 'Cooking']}></Person>
            <Person name='Alice' age={16} hobbies={['Swimming', 'Painting']}></Person>
            <Person name='Robert' age={30} hobbies={['Gardening', 'Photography', 'Camping']}></Person>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));