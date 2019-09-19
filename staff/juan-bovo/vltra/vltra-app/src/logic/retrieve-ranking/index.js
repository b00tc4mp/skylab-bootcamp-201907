const REACT_APP_API_URL = process.env.REACT_APP_API_URL

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