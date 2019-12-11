import utils from 'utils'
const { validate } = utils
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieves an enrollment for the current year
 * 
 * @param {string} studentId 
 * 
 * @returns {Promise}
 */

export default function (studentId){
    validate.string(studentId)

    return(async ()=> {
        const response = await fetch(`${REACT_APP_API_URL}/enrollments/${studentId}` , {
            method : 'GET'
        })
        if(response.status !== 200){
            const { error } = await response.json()
            throw new Error(error)
        }
        else{
            return await response.json()
        }
    })()
}
