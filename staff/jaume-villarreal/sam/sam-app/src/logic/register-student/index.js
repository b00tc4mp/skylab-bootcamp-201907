import utils from 'utils'

const { validate } = utils

const REACT_APP_DB_URL = process.env.REACT_APP_DB_URL

/**
 * Retrieves all students by tutor id.
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} dni 
 * @param {string} phone1 
 * @param {string} email 
 * @param {string} password 
 * @param {string} repassword 
 * 
 * @returns {Promise}
 */

export default function (name , surname , birthdate , healthcard) {
    
    validate.string(name, 'name')
    validate.alphabetic(name , 'name')
    validate.string(surname, 'surname')
    validate.alphabetic(surname , 'surname')
    validate.date(birthdate, 'birthdate')
    validate.string(healthcard, 'healthcard')
    
    return (async () => {
        const response = await fetch(`${REACT_APP_DB_URL}/students`, {
            method: 'POST',
            headers: {'authorization' : `bearer ${this.__token__}` , 'content-type': 'application/json'},
            body: JSON.stringify({ name , surname , birthdate , healthcard })
        })
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }else {
            return await response.json()
        }   
    })()
}