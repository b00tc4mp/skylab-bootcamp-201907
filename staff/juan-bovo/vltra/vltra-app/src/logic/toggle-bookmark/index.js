const { validate} = require('vltra-utils')
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

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
        debugger
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }

        const message = await response.json()
        debugger
        return message
     })()
}