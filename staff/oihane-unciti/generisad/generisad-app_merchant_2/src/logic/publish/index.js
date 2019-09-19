import logic from '..'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function ({name}, title, description, price, location, domain) {
    
    const token = logic.userCredentials
    const image = name

    

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/ads`, {
            method: 'post',
            headers: { 'content-type': 'application/json', authorization: `bearer ${token}` },
            body: JSON.stringify({image , title, description, price, location, domain })
        })
        
        if (response.status === 201) {
            const { adId } = await response.json()
            return adId

        } else {
            const { error } = await response.json()
            throw new Error(error)
        }

    })()
}

