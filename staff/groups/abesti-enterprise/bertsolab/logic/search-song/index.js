logic.searchtracks = function (id, token, q_artist, q_track) {
    let favorites

    if (id != undefined && token != undefined) {
        validate.string(id, 'id')
        validate.string(token, 'token')
        validate.string(q_artist, 'query', false)
        validate.string(q_track, 'query', false)
        
        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)

                favorites = response.data.favorites

                return call(`https://api.musixmatch.com/ws/1.1/track.search?apikey=e492562d27469098b0922d5d580837eb&q_artist=${q_artist}&q_track=${q_track}`, 'get', undefined, undefined)
                    .then(lyrics => {
                        if (lyrics.error) return [] //check if answers with an error
                        else {
                            favorites && lyrics.forEach(track => track.favorite = favorites.includes(track.id)) //--> Check track id... there are two: track_id and commontrack_id

                            return lyrics
                        }
                    })
            })
    } else {
        validate.string(query, 'query', false)

        return call(`https://api.musixmatch.com/ws/1.1/track.search?apikey=e492562d27469098b0922d5d580837eb&q_artist=${q_artist}&q_track=${q_track}`, 'get', undefined, undefined)
            .then(lyrics => {
                if (lyrics.error) return []

                favorites && lyrics.forEach(track => track.favorite = favorites.includes(track.id))

                return lyrics
            })
    }
}