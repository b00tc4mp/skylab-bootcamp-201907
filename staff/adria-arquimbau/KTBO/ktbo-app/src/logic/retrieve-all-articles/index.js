const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function () {
   
    return (async () => {
        
        const {  token } = sessionStorage

        const response = await fetch(`${REACT_APP_API_URL}/user/articles`, {
            method: 'GET',
            headers: { 'authorization': `bearer ${token}` }
        })
        
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        
        const articles = await response.json()
        return articles
        
    })()
}