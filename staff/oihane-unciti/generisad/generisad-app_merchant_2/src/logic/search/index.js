const REACT_APP_API_URL = process.env.REACT_APP_API_URL


export default function (query, domain)  {

    return(async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/search/?query=${query}&domain=${domain}`, {
            method: 'get',
            headers: { 'content-type': 'application/json'}, 
           
        })

        if (response.status !== 200) {
            const { error } = await response.json()

            

            throw Error(error)
        }

    
        const ads = await response.json()
    
        return ads.ad

    })()
}
