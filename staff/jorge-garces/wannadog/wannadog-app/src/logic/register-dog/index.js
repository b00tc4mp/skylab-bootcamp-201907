import logic from '../../logic'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL


export default function (name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, callback, image) {

    let latitude, longitude

    navigator.geolocation.getCurrentPosition(function (position) {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        return (async () => {
            const dogId = await registerDog(name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, longitude, latitude, chip)
            callback(dogId, image)
        })()
    },
        function (error) {
            if (error.code === error.PERMISSION_DENIED) {
                alert('Not using geolocation heavily limits wannadogs functionality, please relaunch the application if you want to activate it')
                latitude = 0
                longitude = 0
                return (async () => {
                    const dogId = await registerDog(name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, longitude, latitude, chip)
                    callback(dogId, image)
                })()
            }
        })
}

async function registerDog(name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, longitude, latitude, chip) {

    let response = await fetch(`${REACT_APP_API_URL}/user/dog`, {
        method: 'post',
        headers: { 'content-type': 'application/json', 'authorization': `bearer ${logic.__token__}` },
        body: JSON.stringify({ name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, location: { coordinates: [longitude, latitude] }, chip })
    })

    if (response.status !== 201) {
        const { error } = await response.json()
        throw Error(error)
    }
    const { dogId } = await response.json()
    return dogId
}