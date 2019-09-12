const {validate} = require('footcamp-utils')

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (email, password) {

    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')


    return (async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/auth`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({email, password})
        })
        const responseJson = await response.json()
        
        if (response.status !== 200) {
            const { error } = await responseJson
            throw Error(error)
        }
        else {
            return  responseJson
        }
            
    })()
}