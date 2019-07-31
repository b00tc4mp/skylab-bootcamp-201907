class Login extends React.Component {
    constructor() {
        super()
    }

    handleSubmit = event => {
        event.preventDefault()
        const email = document.querySelector("#email").value
        const password = document.querySelector("#password").value

        logic.login(email , password)

        console.log(`${email} is logged`)
    }



    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <p>
                    <label htmlFor = "email">Email</label>
                    <input type="email" name="email" id="email" />
                </p>

                <p>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </p>    
                
                <button>Login</button>
            </form>


            <a href="" onClick={event => {
                event.preventDefault()
                this.props.back()
            }}>Go back</a>
        </div>
    }
}
