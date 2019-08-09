## Esputifú
Experience a new way of accessing Spotify resources through our web app.

## Motivation
Esputifú was created a as test case, main goal being to get familiarized with React Javascript Library and how to communicate with external APIs.

## Features

* Register a user.
* Sign in.
* Search music tracks.
* Access track details such as artist, album, release date and more.
* Listen a 30 seconds track preview (not available on all tracks).

## Build status 

[![Build Status](https://img.shields.io/badge/build-working-brightgreen.svg)](https://github.com/joseortuno/skylab-bootcamp-201907/tree/esputy/develop/staff/groups/esputy-corp/esputyfu)
 
## Tech/framework used

[![framework](https://img.shields.io/badge/made%20with-React-blue.svg)](https://reactjs.org/)

## Screenshots

### Register

![register](https://i.ibb.co/C7hGw4t/register.png)

### Sign in

![login](https://i.ibb.co/PMM2DyD/signin.png)

## Code Example

```
logic.toggleFavTrack = function (id, token, idTrack) {
    if (typeof id !== 'string') throw new Error(`id user with value ${id} is not a string`)
    if (typeof token !== 'string') throw new Error(`token user with value ${token} is not a string`)
    if (typeof idTrack !== 'string') throw new Error(`track id with value ${idTrack} is not a string`)
}

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
```

## API Reference

[Spotify General API Documentation](https://developer.spotify.com/documentation/)

[Spotify Web-API](https://developer.spotify.com/documentation/web-api/)

## How to use?

Load index.html on live server.

## Credits

* Jose Ortuño [Github](https://github.com/joseortuno/)

* Roger Pérez [Github](https://github.com/rogervegan/)

* Néstor Lloréns [Github](https://github.com/nestorllorens/)


## License

Esputy Corp™.