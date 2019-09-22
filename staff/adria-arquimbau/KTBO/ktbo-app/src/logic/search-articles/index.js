import validate from '../../utils/validate'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (query)  {
     
    validate.string(query, 'query')

    return(async () => {

        const { token } = sessionStorage
    
        const response = await fetch(`${REACT_APP_API_URL}/user/searchArticles/${query}`, {
            method: 'GET',
            headers: { 'authorization': `bearer ${token}` }
        })
    
        const articles = await response.json()
    
        return articles

    })()
}