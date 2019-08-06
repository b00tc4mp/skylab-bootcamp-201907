const { Component } = React

class Home extends Component {
    constructor() {
        super()

        this.state = { query: undefined, ducks: [], duck: undefined, error: undefined, user: undefined }
    }


    render() {
        const { state: { ducks, duck, error, user }, handleSearch, handleRetrieveDuck, handleRegister, handleBackFromDetail, handleLogin, handleLogout, handleToggleFavDuckFromDuckItem, handleToggleFavDuckFromDuckDetail, handleAcceptError } = this

        return <>
            <header>
                {user && <p>Hello, {user.name}</p>}
                <nav>
                    <a href=""><img src="logo.jpg" alt=""/></a>

                    {!user ? <select>
                        <option selected disabled>Mi Cuenta 👤</option>
                        <option value="login">Register</option>
                        <option value="register"><a href="" onClick={handleLogin}>Login</a></option>
                    </select> : <select>
                            <option value="logout"><a href="" onClick={handleLogout}>Logout</a></option>
                        </select>}

                </nav>
            </header>

            <Search onSearch={handleSearch} />

            <footer>
                <p>Copyrigth © SkyLab 2019 </p>
            </footer>
        </>
    }
}
