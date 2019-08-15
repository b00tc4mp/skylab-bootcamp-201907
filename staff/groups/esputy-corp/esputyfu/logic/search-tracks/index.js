logic.searchTracks = (idUser, tokenUser, song, limit) => {
    let favorites
    if (limit == undefined) limit = '10'
    if (typeof song === 'string') song.split(' ').join('-').toLowerCase()

    if (idUser != undefined && tokenUser != undefined) {
        validate.string(idUser, 'id user')
        validate.string(tokenUser, 'token user')
        validate.string(song, 'song')
        validate.string(limit, 'limit')

        song = song.trim()
        limit = limit.trim()

        return call(
            `https://skylabcoders.herokuapp.com/api/user/${idUser}`,
            'get',
            { 'authorization': `bearer ${tokenUser}` },
            undefined)
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)

                favorites = response.data.favorites

                return call(`http://skylabcoders.herokuapp.com/proxy?url=https://accounts.spotify.com/api/token`, 'post',
                    {
                        'Authorization': `Basic NTQ3N2NhOWQ5NmY2NDZhMmI4NjQ0M2M0MDBmY2FlZDA6OTA4YmI2MGJlMTIyNGJkOTkzZmZjZDY2NWVmNDU5ZDk=`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }, 'grant_type=client_credentials')
            })
            .then(response => {
                checkToken(response.access_token)

                return call(`https://api.spotify.com/v1/search?query=${song}&type=track&offset=0&limit=${limit}`, 'get', { 'Authorization': `Bearer ${response.access_token}` }, undefined)
            })
            .then(response => {
                
                const songs = response.tracks.items.map(item => { 
                    const { album: {
                        images: [{ url }],
                        external_urls: { spotify: linkAlbum },
                        name: nameAlbum,
                        release_date: releaseDate },
                        artists: [{
                            external_urls: { spotify: linkkArtist },
                            name: nameArtist }],
                        explicit,
                        external_urls: { spotify: linkTrack },
                        id: idTrack,
                        name: nameTrack,
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
                        nameTrack,
                        popularity,
                        previewUrl
                    }
                })

                favorites && songs.forEach(song => song.favorite = favorites.includes(song.idTrack))

                return songs
            
            })
            .catch(error => new Error(error))
    } else {
        validate.string(song, 'song')
        validate.string(limit, 'limit')

        song = song.trim()
        limit = limit.trim()

        return call(`http://skylabcoders.herokuapp.com/proxy?url=https://accounts.spotify.com/api/token`,
            'post',
            {
                'Authorization': `Basic NTQ3N2NhOWQ5NmY2NDZhMmI4NjQ0M2M0MDBmY2FlZDA6OTA4YmI2MGJlMTIyNGJkOTkzZmZjZDY2NWVmNDU5ZDk=`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            'grant_type=client_credentials')

            .then(response => {
                checkToken(response.access_token)

                return call(`https://api.spotify.com/v1/search?query=${song}&type=track&offset=0&limit=${limit}`, 'get', { 'Authorization': `Bearer ${response.access_token}` }, undefined)
            })
            .then(response => response.tracks.items.map(item => {

                const { album: {
                    images: [{ url }],
                    external_urls: { spotify: linkAlbum },
                    name: nameAlbum,
                    release_date: releaseDate },
                    artists: [{
                        external_urls: { spotify: linkkArtist },
                        name: nameArtist }],
                    explicit,
                    external_urls: { spotify: linkTrack },
                    id: idTrack,
                    name: nameTrack,
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
                    nameTrack,
                    popularity,
                    previewUrl

                }
            }))
            .catch(error => new Error(error))
    }
}