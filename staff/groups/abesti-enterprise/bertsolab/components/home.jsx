/**
* Component that allows the visualization the main behaviour .
*/

const { Component } = React

class Home extends Component {
    constructor() {
        super()

        this.state = { q_artist: undefined, q_track: undefined, tracks: [], 
                       track: undefined, error: undefined,
                       lyrics: undefined, username: undefined, fav:[]
                     }
        this.handleSearch=this.handleSearch.bind(this)
        this.handleRetrieveSong=this.handleRetrieveSong.bind(this)
        this.handleCloseLyrics = this.handleCloseLyrics.bind(this)
        this.handleToggleFavSong= this.handleToggleFavSong.bind(this)
        this.handleRetrieveSongFav=this.handleRetrieveSongFav.bind(this) 
    }
    
    componentWillMount() {
        const { props: { credentials } } = this

        if (credentials) {
            const { id, token } = credentials

            try {
                logic.retrieveUser(id, token)
                    .then(user => this.setState({ username: user.name}))
                    .catch(({ message }) => this.setState({ error: message }))
            } catch ({ message }) {
                this.setState({ error: message })
            }
        }
    }

    componentWillReceiveProps(props) {
        const { credentials } = props

        !credentials && this.setState({username: undefined, fav :[], q_artist: undefined, q_track: undefined, tracks: []})
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

     handleRetrieveSongFav(track_id){
        const { props: { credentials } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        logic.retrieveFavs(id, token, track_id.toString()) 
            .then(lyrics => this.setState({ lyrics }))
            .catch(({ message }) => this.setState({ lyrics: message }))
    }   
    
    handleToggleFavSong(track_id){
        const { props: { onLogin,  credentials }, state: {q_artist, q_track } }= this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)
        credentials ? logic.toggleFavTrack(id, token, track_id)
            .then(() => this.handleSearch(q_artist, q_track))
            .catch(({ message }) => this.setState({ error: message})) 
            :
            onLogin()
    }


    handleCloseLyrics() {
        this.setState({ lyrics: undefined }) 
    }
    
   
    render() {
        const { state: { tracks, track, error, lyrics , username}, 
                handleSearch, handleRetrieveDuck, handleRegister, 
                handleTosggleFavSong, handleBackFromDetail, handleLogin, handleLogout, 
                handleToggleFavDuckFromDuckDetail, handleAcceptError, 
                handleRetrieveSong,
                handleCloseLyrics, handleToggleFavSong
            } = this


        return <>
           

            <Search onSearch={handleSearch} username = {username} />

            

            <Results items={tracks} paintItem={track => {
                    return <SongItem track={track} onDisplay={handleRetrieveSong} onToggle={handleToggleFavSong}/>
                }} 
            />

            {lyrics && <LyricsItem lyrics={lyrics} onClose={handleCloseLyrics}/>}
        </>
    }
}
