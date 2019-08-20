const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { ducks: [] }

        this.handleSearch = this.handleSearch.bind(this)
    }

    handleSearch(query) {
        logic.searchDucks(query, (error, ducks) => {
            if (error) console.error(error)
            else this.setState({ ducks })
        })
    }

    render() {
        return <>
            <Search onSearch={this.handleSearch} />

            <Results items={this.state.ducks} paintItem={duck => {
                return <DuckItem duck={duck} />
            }} />
        </>
    }
}

function Search(props) {
    return <form onSubmit={event => {
        event.preventDefault()

        const { target: { query: { value: query } } } = event

        props.onSearch(query)
    }}>
        <input type="text" name="query" />
        <button>🔍</button>
    </form>
}

function Results(props) {
    return <ul>
        {props.items.map(item => <li key={item.id}>
            {props.paintItem(item)}
        </li>)}
    </ul>
}

function DuckItem({ duck: { title, imageUrl, price } }) {
    return <>
        <h3>{title}</h3>
        <img src={imageUrl} />
        <span>{price}</span>
    </>
}

ReactDOM.render(<Landing />, document.querySelector('#root'))