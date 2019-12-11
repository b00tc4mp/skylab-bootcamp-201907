const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * calls an endpoint to retrieve all post's from db ordered by average. It does not returns post whitout any votes.
 * 
 * @returns {Array} all post's from db ordered by average.
 */

export default function () {

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/ranking`, {
            method: 'get',
            headers: {}
        })
        
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }

        const {ranking} = await response.json()
    
        return ranking
     })()
}