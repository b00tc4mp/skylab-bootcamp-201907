const REACT_APP_API_URL = process.env.REACT_APP_API_URL

function searchArticles (query)  {
     
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
export default searchArticles