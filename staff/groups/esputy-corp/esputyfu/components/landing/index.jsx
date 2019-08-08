class Landing extends React.Component {
    constructor() {
        super()

        this.state = { search: undefined, tracks: [], track: undefined, favs: [] }

        this.handleSearch = this.handleSearch.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleRetrieveTrack = this.handleRetrieveTrack.bind(this)
        this.handleToggleFavFromTrackDetail = this.handleToggleFavFromTrackDetail.bind(this)
        this.handleToggleFavFromTrackItem = this.handleToggleFavFromTrackItem.bind(this)
        this.handleToggleFavFromFavDetail = this.handleToggleFavFromFavDetail.bind(this)

    }

    handleSearch(query = this.state.query) {
        let id, token

        this.props.credentials && (id = this.props.credentials.id, token = this.props.credentials.token)

        try {
            logic.searchTracks(id, token, query)
                .catch(message => console.error(message))
                .then(response => this.setState({ search: query, tracks: response, track: undefined }))
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

    handleToggleFavFromTrackItem(trackId) {
        let id, token

        this.props.credentials && (id = this.props.credentials.id, token = this.props.credentials.token)

        if (this.props.credentials !== undefined) {
            logic.toggleFavTrack(id, token, trackId)
                .then(() => this.handleSearch(this.state.search))
                .catch(message => console.error(message))
        } else {
            this.props.onLogin()
        }
    }

    handleToggleFavFromTrackDetail(trackId) {
        let id, token

        this.props.credentials && (id = this.props.credentials.id, token = this.props.credentials.token)

        if (this.props.credentials !== undefined) {
            logic.toggleFavTrack(id, token, trackId)
                .then(() => this.handleRetrieveTrack(trackId))
                .catch(message => console.error(message))
        } else {
            this.props.onLogin()
        }
    }

    handleToggleFavFromFavDetail(trackId) {
        let id, token

        this.props.credentials && (id = this.props.credentials.id, token = this.props.credentials.token)

        logic.toggleFavTrack(id, token, trackId)
                .then(() => this.props.backFav())
                .catch(message => console.error(message))
    }

    render() {
        return <>
            <main>
                {this.props.onFavorites && <>
                    <h3>Favoritos</h3>
                    <Results items={this.props.onFavorites} paintItem={track => {
                        return <TrackDetail track={track} onToggle={this.handleToggleFavFromFavDetail} />
                    }} />
                    {this.props.onFavorites.length == 0 && <p>No tienes favoritos</p>}
                </>}
                {!this.props.onFavorites && <>
                    <Search onSearch={this.handleSearch} />
                    {this.state.track === undefined ?
                        <Results items={this.state.tracks} paintItem={track => {
                            return <TrackItem track={track} onToggle={this.handleToggleFavFromTrackItem} />
                        }} onItem={this.handleRetrieveTrack} /> :
                        <TrackDetail track={this.state.track} onToggle={this.handleToggleFavFromTrackDetail} />}
                </>}

            </main>
        </>
    }
}