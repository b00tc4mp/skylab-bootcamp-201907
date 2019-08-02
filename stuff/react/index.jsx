const { Component } = React

class Calculator extends Component { // Calculator IS-A Component
    constructor() {
        super()

        this.state = { result: '' }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()

        const { target: { a: { value: a }, b: { value: b } } } = event

        const result = Number(a) + Number(b)

        this.setState({ result })
    }

    render() {
        return <form className="calculator" onSubmit={this.handleSubmit}>
            <input type="text" name="a"></input>
            <input type="text" name="b"></input>

            <button>=</button>

            <Result value={this.state.result} /> {/* Calculator HAS-A Result */}
        </form>
    }
}

function Result(props) {
    return <span className="calculator__result">{props.value}</span>
}

ReactDOM.render(<Calculator />, document.querySelector('#root'))