logic.retrieveTrack = (idUser, tokenUser, idTrack) => {
    let favorites

    if(idUser != undefined && tokenUser != undefined) {
        validate.string(idUser, 'id user')
        validate.string(tokenUser, 'token user')
        validate.string(idTrack, 'song')

        return call(`https://skylabcoders.herokuapp.com/api/user/${idUser}`, 'get', { 'authorization': `bearer ${tokenUser}` }, undefined)
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
                return call(`https://api.spotify.com/v1/tracks/${idTrack}`, 'get', { 'Authorization': `Bearer ${response.access_token}` }, undefined)
            })
            .then(response => {
                                            
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
                        name: nameTrack, 
                        popularity, 
                        preview_url: previewUrl
                } = response

                const song = { 
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

                favorites && (song.favorite = favorites.includes(song.idTrack))

                return song
            })
    } else {
        validate.string(idTrack, 'song')

        return call(`http://skylabcoders.herokuapp.com/proxy?url=https://accounts.spotify.com/api/token`, 'post',
            {
                'Authorization': `Basic NTQ3N2NhOWQ5NmY2NDZhMmI4NjQ0M2M0MDBmY2FlZDA6OTA4YmI2MGJlMTIyNGJkOTkzZmZjZDY2NWVmNDU5ZDk=`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }, 'grant_type=client_credentials')
            .then(response => {
                checkToken(response.access_token)
                return call(`https://api.spotify.com/v1/tracks/${idTrack}`, 'get', { 'Authorization': `Bearer ${response.access_token}` }, undefined)
            })
            .then(response => {
                                            
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
                        name: nameTrack, 
                        popularity, 
                        preview_url: previewUrl
                } = response
    
                if(favorites) response.favorite = favorites.includes(idTrack)
    
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
    }
}