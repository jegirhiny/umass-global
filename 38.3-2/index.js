const App = () => {
    return (
        <div>
            <Tweet username={'Example Username 1'} name={'Example Name 1'} date={'10/29/2023'} message={'Example Message 1'}/>
            <Tweet username={'Example Username 2'} name={'Example Name 2'} date={'10/29/2023'} message={'Example Message 2'}/>
            <Tweet username={'Example Username 3'} name={'Example Name 3'} date={'10/29/2023'} message={'Example Message 3'}/>
            <Tweet username={'Example Username 4'} name={'Example Name 4'} date={'10/29/2023'} message={'Example Message 4'}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));