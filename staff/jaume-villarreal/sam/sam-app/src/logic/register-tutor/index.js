import utils from 'utils'

const { validate } = utils

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

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

export default function (name , surname , dni , phone1 , email, password , repassword) {
    
    validate.string(name, 'name')
    validate.alphabetic(name , 'name')
    validate.string(surname, 'surname')
    validate.alphabetic(surname , 'surname')
    validate.string(dni, 'dni')
    validate.string(phone1, 'phone1')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')
    validate.string(repassword, 'repassword')
    
    if(password !== repassword) throw new Error ("passwords don't match")

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/tutors`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ name , surname , dni , phone1 , email, password })
        })
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            return await response.json()
        }   
    })()
}