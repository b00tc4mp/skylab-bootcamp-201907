import logic from '..'
// const {validate}= require("generisad-utils")

const REACT_APP_API_URL = process.env.REACT_APP_API_URL


export default function (id)  {
    // validate.string(id, 'id')

    return(async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/product/${id}`, {
            method: 'get',
            headers: { 'content-type': 'application/json'}, 
           
        })

        if (response.status !== 200) {
            const { error } = await response.json()

            

            throw Error(error)
        }

    
        const res = await response.json()
    
        return res.ad

    })()
}
