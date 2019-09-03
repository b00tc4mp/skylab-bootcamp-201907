import registerUser from './register-user'

export default {
    registerUser,

    async searchDucks(query) {
        const response = await fetch(`https://duckling-api.herokuapp.com/api/search?q=${query}`)

        const ducks = await response.json()

        return ducks
    },

    async retrieveDuck(id) {
        const response = await fetch(`https://duckling-api.herokuapp.com/api/ducks/${id}`)

        const duck = await response.json()

        return duck
    }
}