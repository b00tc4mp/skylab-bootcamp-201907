class Login extends React.Component {
    constructor() {
        super()
    }

    render() {
        return <>
            <h2>Login</h2>
            <form >
                <label id="email">email</label>
                <input type="email" name="email" id="email" />
                <label id="password">password</label>
                <input type="password" name="password" id="password" />
            </form>
            <a href="" onClick={event => {
                event.preventDefault()
                this.props.back()
            }}>Go back</a>
        </>
    }
}
