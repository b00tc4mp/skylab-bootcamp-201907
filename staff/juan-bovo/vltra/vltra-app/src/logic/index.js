import registerUser from './register-user'
import authenticateUser from './authenticate-user'
import isUserLoggedIn from './is-user-logged-in'
import logUserOut from './log-user-out'
import retrieveUser from './retrieve-user'
import createPost from './create-post'
import retrieveAllPosts from './retrieve-all-posts'
import retrievePost from './retrieve-post'
import retrieveUserPosts from './retrieve-user-posts'
import votePost from './vote-post'
import toggleBookmark from './toggle-bookmark'
import retrieveRanking from './retrieve-ranking'

export default {
    set __token__(token) {
        sessionStorage.token = token
    },

    get __token__() {
        return sessionStorage.token
    },

    registerUser,
    authenticateUser,
    isUserLoggedIn,
    logUserOut,
    retrieveUser,
    createPost,
    retrieveAllPosts,
    retrievePost,
    retrieveUserPosts,
    votePost,
    toggleBookmark,
    retrieveRanking

    // async searchDucks(query) {
    //     const response = await fetch(`https://duckling-api.herokuapp.com/api/search?q=${query}`)

    //     const ducks = await response.json()

    //     return ducks
    // },

    // async retrieveDuck(id) {
    //     const response = await fetch(`https://duckling-api.herokuapp.com/api/ducks/${id}`)

    //     const duck = await response.json()

    //     return duck
    // }
}