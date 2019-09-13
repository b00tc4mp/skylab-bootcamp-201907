export default function (distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren, callback) {
    debugger
    let latitude, longitude, dogs
    navigator.geolocation.getCurrentPosition(function (position) {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        return (async () => {
            const { results: dogs } = await search(distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren, longitude, latitude)
            callback(dogs)
        })()
    },
        function (error) {
            if (error.code === error.PERMISSION_DENIED) {
                alert('Not using geolocation heavily limits wannadogs functionality, please relaunch the application if you want to activate it')
                latitude = 0
                longitude = 0
                return (async () => {
                    return await search(distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren, longitude, latitude)
                })()
            }
        })
    return dogs
}

async function search(distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren, longitude, latitude) {

    let response = await fetch(`http://localhost:8080/api/dogs`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren, location: { coordinates: [longitude, latitude] } }),
    })

    if (response.status !== 200) {
        const { error } = await response.json()
        throw Error(error)
    }
    const _response = await response.json()
    return _response
}