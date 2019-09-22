const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default (email, password) => {

    return( async() =>{
        const response = await fetch(`${REACT_APP_API_URL}/auth`,{
            method: 'post',
            headers:{ 'content-type': 'application/json'},
            body: JSON.stringify({ email, password })
        })

        if ( response.status !==200 ){
            const { error } = await response.json()

            throw Error(error)
        }
        
        return response.json()
    })()
}