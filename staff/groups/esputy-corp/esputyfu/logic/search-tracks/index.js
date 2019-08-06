logic.searchTracks = (idUser, tokenUser, song, limit) => {
    let favorites
    if(typeof song === 'string') song.split(' ').join('-').toLowerCase()
    // checkToken(token)

    if(idUser != undefined && tokenUser != undefined) {
        if(typeof idUser !== 'string') throw new Error(`id user with value ${idUser} is not a string`)
        if(typeof tokenUser !== 'string') throw new Error(`token user with value ${tokenUser} is not a string`)
        if(limit == undefined) limit = '10'
        if(typeof song !== 'string') throw new Error(`song with value ${song} is not a string`)
        if(typeof limit !== 'string') throw new Error(`limit with value ${limit} is not a string`)

        song = song.trim()
        limit = limit.trim()

        return call(
            `https://skylabcoders.herokuapp.com/api/user/${idUser}`, 
            'get', 
            { 'authorization': `bearer ${tokenUser}` }, 
            undefined,
            'skylab')
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)

                favorites = response.data.favorites

                return call(
                    `https://api.spotify.com/v1/search?query=${song}&type=track&offset=0&limit=${limit}`, 
                    'get', 
                    { 'Authorization': `Bearer ${token}` }, 
                    undefined,
                    'spotify')
                    .catch(error => new Error(error))
                    .then(response => response.tracks.items.map(item => {
                        
                        const { album: { 
                                    images:[{ url }], 
                                    external_urls:{ spotify: linkAlbum }, 
                                    name: nameAlbum, 
                                    release_date: releaseDate },
                                artists: [{ 
                                    external_urls:{ spotify: linkkArtist }, 
                                    name: nameArtist}],
                                explicit, 
                                external_urls:{spotify: linkTrack}, 
                                id: idTrack, 
                                popularity, 
                                preview_url: previewUrl
                        } = item

                        if(favorites) item.favorite = favorites.includes(idTrack)
            
                        return { 
                            // album
                                url, 
                                linkAlbum, 
                                nameAlbum,
                                releaseDate,
                            // artist
                                linkkArtist,
                                nameArtist,
                                explicit,
                            // track
                                linkTrack,
                                idTrack,
                                popularity,
                                previewUrl
                        }
                }))

            })

       
    

    } else {
        if(limit == undefined) limit = '10'
        if(typeof song !== 'string') throw new Error(`song with value ${song} is not a string`)
        if(typeof limit !== 'string') throw new Error(`limit with value ${limit} is not a string`)

        song = song.trim()
        limit = limit.trim()

        return call(`https://api.spotify.com/v1/search?query=${song}&type=track&offset=0&limit=${limit}`, 'get', 
        { 'Authorization': `Bearer ${token}` }, 
        undefined,
        'spotify')
            .catch(error => new Error(error))
            .then(response => response.tracks.items.map(item => {
                
                const { album: { 
                            images:[{ url }], 
                            external_urls:{ spotify: linkAlbum }, 
                            name: nameAlbum, 
                            release_date: releaseDate },
                        artists: [{ 
                            external_urls:{ spotify: linkkArtist }, 
                            name: nameArtist}],
                        explicit, 
                        external_urls:{spotify: linkTrack}, 
                        id: idTrack, 
                        popularity, 
                        preview_url: previewUrl
                } = item
    
                return { 
                // album
                    url, 
                    linkAlbum, 
                    nameAlbum,
                    releaseDate,
                // artist
                    linkkArtist,
                    nameArtist,
                    explicit,
                // track
                    linkTrack,
                    idTrack,
                    popularity,
                    previewUrl
    
            }}))
    }
}