export default function (distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren) {
    debugger
    let latitude, longitude
    navigator.geolocation.getCurrentPosition(function (position) {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        return search(distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren, longitude, latitude)
    },
        function (error) {
            if (error.code === error.PERMISSION_DENIED) {
                alert('Not usin geolocation heavily limits wannadogs functionality, please relaunch the application if you want to activate it')
                latitude = 0
                longitude = 0
                return search(distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren, longitude, latitude)
            }
        })
}

async function search(distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren, longitude, latitude) {

    let response = await fetch(`http://localhost:8080/api/dogs`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren, location: { coordinates: [longitude, latitude] } }),
    })

    debugger

    response = await response.json()

    if (response.status !== 201) {
        const { error } = await response.json()
        throw Error(error)
    }
}