const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (pollId, body) { 
    // validate fields

    return (async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/polls/${pollId}/update`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' } ,
            body: JSON.stringify({ body })
        })

        if (response.status !== 201) {

            const { error } = await response.json()

            throw Error(error)
        }

        const { resPoll } = await response.json()

        return resPoll
        
    })()
}