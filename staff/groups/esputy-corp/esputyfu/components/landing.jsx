class Landing extends React.Component {
    constructor() {
        super()

        this.state = { search: undefined, tracks: [] }

        this.handleSearch = this.handleSearch.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)

    }

    handleSearch(query = this.state.query) {
        try {
            logic.searchTracks( this.props.data.id, this.props.data.token, query)
                .catch(message => console.error(message))
                .then(response => {
                    this.setState({ search: query })
                    this.setState({ tracks: response })
                    console.log(response)
                })
        } catch {
            console.error(error)
        }
    }

    handleLogin(event) {
        event.preventDefault()
        this.props.onLogin()
    }

    handleRegister(event) {
        event.preventDefault()
        this.props.onRegister()
    }


    render() {
        return <>
            <main>
                <section>
                    <Search onSearch={this.handleSearch} />
                </section>
                <section>

                </section>

            </main>
        </>
    }
}