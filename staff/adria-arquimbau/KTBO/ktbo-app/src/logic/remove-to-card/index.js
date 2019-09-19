const REACT_APP_API_URL = process.env.REACT_APP_API_URL

function removeToCart (articleId)  {
     
    //TODO validate

    
    return(async () => {

        const { token } = sessionStorage
       
        await fetch(`${REACT_APP_API_URL}/user/cart`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json', 'authorization': `bearer ${token}`},
            body: JSON.stringify({articleId})
        })
        //No queremso respuesta ??
        /* const {articles} = await response.json()
        return articles */

    })()
}
export default removeToCart