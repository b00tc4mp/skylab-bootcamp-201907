/**
 * Retrieves a random joke 
 * 
 * @throws {Error} When data API doesn't retrieve a joke.
 * 
 * @returns {Array} A random joke.
 */


logic.getRandomJoke = () => {

    return call('https://api.chucknorris.io/jokes/random', 'get', undefined, undefined)
        .then(random => {
            if (random['error'] === 'Not Found') throw new Error(`error: ${random['status']}, server status: ${random['status']}`)
            console.log(random)
            return random

        })
}