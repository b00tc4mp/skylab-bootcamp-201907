logic.getRandomJoke = () => {

    return call('https://api.chucknorris.io/jokes/random', 'get', undefined, undefined)
        .then(random => {
            if (random['error'] === 'Not Found') throw new Error(`error: ${random['status']}, server status: ${random['status']}`)

            return random

        })
}