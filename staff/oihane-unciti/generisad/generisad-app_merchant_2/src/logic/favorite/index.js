import logic from '..'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (id) {
    // validate fields
    const token = logic.userCredentials
   
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/ads/${id}/favorite`, {
            method: 'post',
            headers: { 'content-type': 'application/json', authorization: `bearer ${token}` },
            body: JSON.stringify({})
        })
        
        if (response.status === 201) {
            const { adId } = await response.json()
            console.log(adId) 

        } else {
            const { error } = await response.json()
            throw new Error(error)
        }

    })()
}

