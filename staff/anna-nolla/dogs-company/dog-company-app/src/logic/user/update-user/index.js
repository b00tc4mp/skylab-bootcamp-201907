import { call, validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL
/**
 * Updates a user.
 * 
 * @param {string} this.__token__
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @param {string} newPassword
 * @param {string} repassword
 * 
 */

export default function (name, surname, email, newPassword, repassword) {
   let data

    validate.string(this.__token__, 'user id')
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email, 'email')
    if (newPassword) validate.string(newPassword, 'new password')
    if (repassword) validate.string(repassword, 'repeat password')
    
    if (newPassword !== repassword) throw Error('New passwords do not match')
    
    if (newPassword === "" ) data = { name, surname, email }
    if (newPassword === repassword && newPassword !== "") data = { name, surname, email, password: newPassword }
    
    return (async () => {debugger
        const response = await call(`${REACT_APP_API_URL}/user` , 'patch' , 
        { 'authorization': `bearer ${this.__token__}`, 'content-type': 'application/json' }, 
        data )
    
        if (response.error) {
            const { error } = response
                throw Error(error)
        }
        return 
    })()
}
