const { validate} = require('vltra-utils')
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * returns an array of posts created by the user
 * No params, user's id on token
 * 
 * @returns {Array} user's posts.
 */

export default function () {
    //validate.objectId(authorId, 'authorId')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/posts/author/`, {
            method: 'GET',
            headers: {'authorization' : `bearer ${this.__token__}`}
        })
        
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }

        const {authorPosts} = await response.json()
        
        return authorPosts
     })()
}