class Register extends React.Component {
    constructor() {
        super()
    }

    render() {
        return <>
            <h2>Register</h2>
            <form >
                <label id="name">Name</label>
                <input type="text" name="name" id="name" />
                <label id="surname">Surname</label>
                <input type="text" name="surname" id="surname" />
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

