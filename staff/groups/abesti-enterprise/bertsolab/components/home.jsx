const { Component } = React

class Home extends Component {
    constructor() {
        super()

        this.state = { q_artist: undefined, q_track: undefined, tracks: [], 
                       track: undefined, error: undefined,
                       lyrics: undefined, username: undefined
                     }
        this.handleSearch=this.handleSearch.bind(this)
        this.handleRetrieveSong=this.handleRetrieveSong.bind(this)
        this.handleCloseLyrics = this.handleCloseLyrics.bind(this)
        //this.handlePaintLyrics=this.handlePaintLyrics.bind(this)
    }
    
    componentWillMount() {
        const { props: { credentials } } = this

        if (credentials) {
            const { id, token } = credentials

            try {
                logic.retrieveUser(id, token)
                    .then(user => this.setState({ username: user.name }))
                    .catch(({ message }) => this.setState({ error: message }))
            } catch ({ message }) {
                this.setState({ error: message })
            }
        }
    }

    componentWillReceiveProps(props) {
        const { credentials } = props

        !credentials && this.setState({username: undefined})
    }

    handleSearch(q_artist, q_track) {
        const { props: { credentials } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        logic.searchSongs(id, token, q_artist, q_track)
            .then(tracks => this.setState({ tracks, q_artist, q_track }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleRetrieveSong(track_id) {
        const { props: { credentials } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        logic.retrieveLyrics(id, token, track_id.toString()) 
            .then(lyrics => this.setState({ lyrics }))
            .catch(({ message }) => this.setState({ lyrics: message }))
        
    }

    // handlePaintLyrics(lyrics){
    //     console.log("hey")
    //     console.log(lyrics)
    // }

    handleCloseLyrics() {
        this.setState({ lyrics: undefined }) 
    }
    
   
    render() {
        const { state: { tracks, track, error, lyrics , username}, 
                handleSearch, handleRetrieveDuck, handleRegister, 
                handleTosggleFavSong, handleBackFromDetail, handleLogin, handleLogout, 
                handleToggleFavDuckFromDuckDetail, handleAcceptError, 
                handleRetrieveSong,
                handleCloseLyrics
               // handlePaintLyrics 
              } = this


        return <>
           

            <Search onSearch={handleSearch} username = {username} />

            

            <Results items={tracks} paintItem={track => {
                    // return <SongItem track={track} onDisplay={handleRetrieveSong} paintItem={track => {
                    //     <LyricsItem lyrics={lyrics} onDisplay={handlePaintLyrics} />
                    // }}/>
                // }} />
                    return <SongItem track={track} onDisplay={handleRetrieveSong}/>
                }}
            />

            {lyrics && <LyricsItem lyrics={lyrics} onClose={handleCloseLyrics}/>}

        </>
    }
}
