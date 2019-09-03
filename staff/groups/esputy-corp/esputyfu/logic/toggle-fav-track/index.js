logic.toggleFavTrack = (id, token, idTrack) => {
    validate.string(id, 'id user')
    validate.string(token, 'token user')
    validate.string(idTrack, 'id track')

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)

            const favorites = response.data.favorites

            const index = favorites.findIndex(favorite => favorite === idTrack)

            if (index > -1) {
                favorites.splice(index, 1)

                return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'put', { 'content-type': 'application/json', 'authorization': `bearer ${token}` }, JSON.stringify({ favorites }))
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)
                    })
            } else
                return call(`http://skylabcoders.herokuapp.com/proxy?url=https://accounts.spotify.com/api/token`, 'post',
                    {
                        'Authorization': `Basic NTQ3N2NhOWQ5NmY2NDZhMmI4NjQ0M2M0MDBmY2FlZDA6OTA4YmI2MGJlMTIyNGJkOTkzZmZjZDY2NWVmNDU5ZDk=`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }, 'grant_type=client_credentials')
                    .then(response => {
                        checkToken(response.access_token)
                        return call(`https://api.spotify.com/v1/tracks/${idTrack}`, 'get', { 'Authorization': `Bearer ${response.access_token}` }, undefined)
                    })
                    .catch(error => new Error(error))
                    .then(track => {
                        favorites.push(idTrack)

                        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'put', { 'content-type': 'application/json', 'authorization': `bearer ${token}` }, JSON.stringify({ favorites }))
                            .then(response => {
                                if (response.status === 'KO') expression(new Error(response.error))
                            })
                    })
        })
}