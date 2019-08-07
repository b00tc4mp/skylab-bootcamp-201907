class Landing extends React.Component {
    constructor() {
        super()

        this.state = { search: undefined, tracks: [], track: undefined }

        this.handleSearch = this.handleSearch.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleRetrieveTrack = this.handleRetrieveTrack.bind(this)

    }

    handleSearch(query = this.state.query) {
        try {
            logic.searchTracks(this.props.data.id, this.props.data.token, query)
                .catch(message => console.error(message))
                .then(response => this.setState({ search: query, tracks: response }))
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

    handleRetrieveTrack(trackId) {
        let id, token

        this.props.credentials && (id = this.props.credentials.id, token = this.props.credentials.token)

        logic.retrieveTrack(id, token, trackId)
            .then(track => this.setState({ track }))
            .catch(message => console.error(message))
    }


    render() {
        return <>
            <main>
                <section>
                    <Search onSearch={this.handleSearch} />
                </section>
                {this.state.tracks && this.state.tracks.length && <section>
                    <Results items={this.state.tracks} paintItem={track => {
                        return <TrackItem track={track} />
                    }} onItem={this.handleRetrieveTrack} />
                </section>}

            </main>
        </>
    }
}