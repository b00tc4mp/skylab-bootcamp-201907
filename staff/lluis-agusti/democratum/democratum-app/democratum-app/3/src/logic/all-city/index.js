//import validate from '../../utils/validate'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (targetCityId) {

const { __token__ } = sessionStorage

    return (async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/polls/citypollsall/${targetCityId}`, {
            method: 'GET',
            headers: {'authorization': `bearer ${__token__}` }
        })
        
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            return await response.json()
        }
    })()
}