const { validate} = require('vltra-utils')
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * It toggles (push / pop) a certain post's id on user's bookmarks array.
 * No user info on params, user's id send by token
 * 
 * @param {string} postId a post's id on db.
 * 
 * @returns {string} a message confirmating bookmark's toggle.
 */

export default function (postId) {
    validate.objectId(postId, 'postId')
    
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/bookmark`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${this.__token__}`
            },
            body: JSON.stringify({
                postId
            })
        })
        
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }

        const message = await response.json()
        
        return message
     })()
}