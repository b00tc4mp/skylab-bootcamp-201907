const { validate} = require('vltra-utils')
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Returns a post from db
 * 
 * @param {string} postId post's id
 * 
 * @returns {Object} post's info.
 */

export default function (postId) {
    validate.string(postId, 'postId')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/post/${postId}`, {
            method: 'get',
            headers: {
                // authorization: `bearer ${this.__token__}`
            }
        })
        
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }

        const { post } = await response.json()
        
        return post
     })()
}