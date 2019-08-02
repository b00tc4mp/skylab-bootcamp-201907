const { Component } = React

function Landing() {
    return <>
        <Search />
        
    </>
}

class Search extends Component {
    constructor() {
        super()

        this.state = { ducks: [] }
    }

    render() {
        return <>
            <form onSubmit={event => {
                event.preventDefault()

                const { target: { query: { value: query } } } = event

                // TODO call logic search ducks

                logic.searchDucks(query, (error, ducks) => {
                    if (error) console.error(error)
                    else {
                        // TODO list ducks
                        //console.log(ducks)
                        this.setState({ ducks })
                    }
                })
            }}>
                <input type="text" name="query" />
                <button>🔍</button>
            </form>
            <ul>
                {this.state.ducks.map(duck => <li>
                    <h3>{duck.title}</h3>
                    <img src={duck.imageUrl} />
                    <span>{duck.price}</span>
                </li>)}
            </ul>
        </>
    }
}

ReactDOM.render(<Landing />, document.querySelector('#root'))