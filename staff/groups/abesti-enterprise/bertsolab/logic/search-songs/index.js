/**
 * @description This function searchs for songs in Musixmatch's database using 2 strings: artist name and track title.
 * Besides, it includes 3 extra parameters:
 * - apikey: our key identifier as users of Musixmatch API.
 * - s_track_rating: it helps on sorting search results prioritizing the most popular songs.
 * - f_has_lyrics: prioritize songs which has lyrics.
 *  
 * @param id user id
 * @param token valid credentials on database
 * @param q_artist artist name
 * @param q_track track name
 * 
 * @returns 
 */

logic.searchSongs =  (id, token, q_artist, q_track) => {
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
                return call(`https://skylabcoders.herokuapp.com/proxy?url=https://api.musixmatch.com/ws/1.1/track.search?apikey=e492562d27469098b0922d5d580837eb&q_artist=${q_artist}&q_track=${q_track}&s_track_rating=ASC&f_has_lyrics`, 'get', undefined, undefined)
                    .then(res => {
                        if(res.message.header.status_code === 401) throw new Error("invalid token")
                        else {
                        
                            const { message: { body: { track_list }}} = res
                            favorites && track_list.forEach(item => item.track.favorite = favorites.includes(item.track.track_id.toString())) // -> Should work properly when favorites be up & running :)

                            return track_list
                        }
                    })
            })
    } else {
        validate.string(q_artist, 'query', false)
        validate.string(q_track, 'query', false)

        return call(`https://skylabcoders.herokuapp.com/proxy?url=https://api.musixmatch.com/ws/1.1/track.search?apikey=e492562d27469098b0922d5d580837eb&q_artist=${q_artist}&q_track=${q_track}&s_track_rating=ASC&f_has_lyrics`, 'get', undefined, undefined)
            .then(res => {
                if(res.message.header.status_code === 401) throw new Error("invalid artist or song")
                
                const { message: { body: { track_list }}} = res
                return track_list       
            })
    }
}
