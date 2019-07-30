class Login extends React.Component {
    constructor() {
        super()
    }

    render() {
        return <div>
            <form >
                <label id="email">Name</label>
                <input type="email" name="email" id="email" />
                <label id="password">Name</label>
                <input type="password" name="password" id="password" />
            </form>
            <a href="" onClick={event => {
                event.preventDefault()
                this.props.back()
            }}>Go back</a>
        </div>
    }
}
