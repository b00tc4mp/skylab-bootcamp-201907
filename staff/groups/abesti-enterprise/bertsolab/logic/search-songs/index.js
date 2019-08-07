logic.searchSongs = function (id, token, q_artist, q_track) {
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

                return call(`http://skylabcoders.herokuapp.com/proxy?url=https://api.musixmatch.com/ws/1.1/track.search?apikey=e492562d27469098b0922d5d580837eb&q_artist=${q_artist}&q_track=${q_track}`, 'get', undefined, undefined)
                    .then(res => {
                        if(res.message.header.status_code === 401) throw new Error("invalid token") //check if this gives the proper error
                        else {
                            const { message: { body: { track_list }}} = res
                            favorites && track_list.forEach(track => track.favorite = favorites.includes(track_id))

                            return track_list
                        }
                    })
            })
    } else {
        validate.string(q_artist, 'query', false)
        validate.string(q_track, 'query', false)

        return call(`http://skylabcoders.herokuapp.com/proxy?url=https://api.musixmatch.com/ws/1.1/track.search?apikey=e492562d27469098b0922d5d580837eb&q_artist=${q_artist}&q_track=${q_track}`, 'get', undefined, undefined)
            .then(res => {
                if(res.message.header.status_code === 401) throw new Error("invalid artist or song")
                
                const { message: { body: { track_list }}} = res
                return track_list       
            })
    }
}
