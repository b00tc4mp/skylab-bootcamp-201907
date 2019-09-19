const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieves a student
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */

export default function(id){
    return(async () => {
        const headers = {'content-type' : 'application/json'}
        const response = await fetch(`${REACT_APP_API_URL}/students/${id}` , {
            method : 'GET',
            headers: headers
        })
        if(response.status !== 200){
            const { error } = await response.json()
            throw new Error (error)
        }else{
            return await response.json()
        }
    })()
}
