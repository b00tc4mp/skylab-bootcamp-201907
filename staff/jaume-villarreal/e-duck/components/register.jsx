class Register extends React.Component {
    constructor() {
        super() 
    }

    handleSubmit = event => {
        event.preventDefault()
        const name = document.querySelector('#name').value
        const surname = document.querySelector('#surname').value
        const email = document.querySelector('#email').value
        const password = document.querySelector('#password').value
        
        logic.register(name , surname , email , password)
    }


    render() {
        return <div>

            <form className="form__register" onSubmit={this.handleSubmit}>
                <p>
                    <label htmlFor = "name">Name</label>
                    <input
                        type="text"
                        name="name" 
                        id="name" /> 
                </p>
                <p>
                    <label htmlFor = "surname">Surname</label>
                    <input
                        type="text"
                        name="surname"
                        id="surname" />
                </p>
                <p>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email" />
                
                </p>
                <p>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password" />
                </p>
                <button>Submit</button>
            </form>

            <a href="" onClick={event => {
                event.preventDefault()
                this.props.back()
            }}>Go back</a>
        </div>
    }
}

