const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (pollId, vote) { 

    return (async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/polls/${pollId}/votepoll`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' , 'authorization': `bearer ${this.__token__}` } ,
            body: JSON.stringify({ vote })
        })

        if (response.status !== 201) {

            const { error } = await response.json()

            throw Error(error)
        }

        const { resPoll } = await response.json()

        return resPoll
        
    })()
}