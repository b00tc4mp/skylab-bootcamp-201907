const { validate} = require('vltra-utils')

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (title, body, author) {
    validate.string(title, 'title')
    validate.string(body, 'body')
    validate.objectId(author, 'author')
    
    return (async () => {
        debugger
        const response = await fetch(`${REACT_APP_API_URL}/posts`, {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'authorization': `bearer ${this.__token__}` },
            body: JSON.stringify({
                title, 
                body, 
                author
            })
        })
        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }
    })()
}