const { validate} = require('vltra-utils')

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (title, body) {
    validate.string(title, 'title')
    validate.string(body, 'body')
    //validate.objectId(author, 'author')

    if(body.length > 2000) throw Error('post body is too long (max. 2000 characters)')
    if(title.length > 100) throw Error('title body is too long (max. 100 characters)')
    
    return (async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/posts`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${this.__token__}`
            },
            body: JSON.stringify({
                title, 
                body
            })
        })
        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }
    })()
}