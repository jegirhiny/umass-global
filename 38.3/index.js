const App = () => {
    return (
        <div>
            <NamedComponent name='Jake'/>
            <FirstComponent />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));