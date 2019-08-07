const { Component } = React

class Home extends Component {
    constructor() {
        super()

        this.state = { query: undefined, ducks: [], duck: undefined, error: undefined, user: undefined }
    
    }

    



    render() {
        const { state: { ducks, duck, error, user }, handleSearch, handleRetrieveDuck, handleRegister, handleBackFromDetail, handleLogin, handleLogout, handleToggleFavDuckFromDuckItem, handleToggleFavDuckFromDuckDetail, handleAcceptError } = this

        return <>
           

            <Search onSearch={handleSearch} />

        </>
    }
}
