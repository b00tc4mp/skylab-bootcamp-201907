import logic from '..'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (id, title, body) {
    // validate fields
    const token = logic.userCredentials
    let domain = window.location.hostname;
    
    return (async () => { 
        const response = await fetch(`${REACT_APP_API_URL}/users/ads/${id}/message`, {
            method: 'post',
            headers: { 'content-type': 'application/json', authorization: `bearer ${token}` },
            body: JSON.stringify({title, body, domain })
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
