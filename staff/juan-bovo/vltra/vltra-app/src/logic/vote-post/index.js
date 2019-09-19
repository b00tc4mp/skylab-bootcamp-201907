const { validate} = require('vltra-utils')
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * It sends to db a certain user's valoration on a certain post, expresed by number.
 * User can not vote twice the same post.
 * No user info on params, user's id send by token
 * 
 * @param {string} postId a post's id on db
 * @param {number} userVote user's valoration on post (min 1, max 5)
 * 
 * @returns {string} message confirmating user's vote, or error if post is already voted by user.
 */
export default function (postId, userVote) {
    validate.objectId(postId, 'postId')
    validate.number(userVote, 'userVote')
    
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/post/vote`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${this.__token__}`
            },
            body: JSON.stringify({
                postId, 
                userVote
            })
        })
        
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }

        const status = await response.json()
        
        return status
     })()
}