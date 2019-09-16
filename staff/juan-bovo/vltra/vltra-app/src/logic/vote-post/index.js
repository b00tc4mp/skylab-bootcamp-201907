const { validate} = require('vltra-utils')
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (postId, userVote) {
    validate.objectId(postId, 'postId')
    validate.number(userVote, 'userVote')
    debugger
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
        debugger
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }

        const {statusText} = await response.json()
        debugger
        return statusText
     })()
}