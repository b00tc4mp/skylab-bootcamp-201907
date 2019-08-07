const { Component } = React

class Home extends Component {
    constructor() {
        super()

        this.state = { q_artist: undefined, q_track: undefined, tracks: [], track: undefined, error: undefined, user: undefined }
        this.handleSearch=this.handleSearch.bind(this)
        this.handleToggleFavSong=this.handleToggleFavSong.bind(this)
    }
    
    componentWillMount() {
        const { props: { credentials } } = this

        if (credentials) {
            const { id, token } = credentials

            try {
                logic.retrieveUser(id, token, (error, user) => {
                    if (error) this.setState({ error: error.message })
                    else this.setState({ user })
                })
            } catch ({ message }) {
                this.setState({ error: message })
            }
        }
    }

    handleSearch(q_artist, q_track) {
        const { props: { credentials } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        logic.searchSongs(id, token, q_artist, q_track)
            .then(tracks => this.setState({ tracks, q_artist, q_track }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleToggleFavSong(commontrack_id) {
        const { props: { onLogin, credentials }, handleSearch, state: { q_artist, q_track } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.toggle(id, token, commontrack_id, () => handleSearch(q_artist, q_track)) : onLogin()
    }

    handleRetrieveSong(track_id) {
        const { props: { credentials } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        logic.retrieveLyrics(id, token, track_id) 
            .then(track => this.setState({ track }))
            .catch(({ message }) => this.setState({ error: message }))
        
    }




    render() {
        const { state: { tracks, track, error, user }, handleSearch, handleRetrieveDuck, handleRegister, handleToggleFavSong, handleBackFromDetail, handleLogin, handleLogout, handleToggleFavDuckFromDuckDetail, handleAcceptError } = this

        return <>
           

            <Search onSearch={handleSearch} />

            <Results items={tracks} paintItem={track => {
                    return <SongItem track={track} />
                }} onItem={handleRetrieveDuck} />

            {/* {!track ?
                <Results items={tracks} paintItem={track => {
                    return <SongItem track={track} onToggle={handleToggleFavSong} />
                }} onItem={handleRetrieveDuck} />
                :
                <DuckDetail duck={duck} onBack={handleBackFromDetail} onToggle={handleToggleFavDuckFromDuckDetail} />}

            {error && <Modal message={error} onAccept={handleAcceptError} />} */}

        </>
    }
}
