import utils from 'utils'

const { validate } = utils

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieves all students by tutor id.
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} birthdate 
 * @param {string} healthcard 
 * 
 * @returns {Promise}
 */

export default function(id , name , surname , birthdate , healthcard){

    validate.string(id, 'id')
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.date(birthdate , 'birthdate')
    validate.string(healthcard, 'healthcard')

    const data = {name , surname , birthdate , healthcard}

    return(async () =>{
        const response = await fetch(`${REACT_APP_API_URL}/students/${id}` , {
            method: 'PATCH',
            headers: { 'content-type' : 'application/json' },
            body: JSON.stringify(data)
        })
        if(response.status !== 200){
            const { error } = await response.json()
            throw new Error(error)
        }else{
            return await response.json()
        }
    })()
}