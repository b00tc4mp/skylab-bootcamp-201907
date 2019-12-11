import { call, validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Registers a pet.
 * 
 * @param {string} this.__token__
 * @param {string} petName 
 * @param {date} age 
 * @param {boolean} gender 
 * @param {string} size
 * @param {string} characteristics
 * 
 */

export default function (petName, age, gender, size, characteristics) {
    validate.string(this.__token__, 'user id')
    validate.string(petName, 'pet name')
    validate.string(age, 'age')
    validate.string(size, 'size')
    validate.string(characteristics, 'characteristics')
    
    let match = ''
    if(gender === "true") match = true
    if(gender === 'false') match = false
        validate.boolean(match, 'gender')

    
    
    return (async () => {
        const response = await call(`${REACT_APP_API_URL}/user/pet` , 'post' , 
        { 'authorization': `bearer ${this.__token__}`, 'content-type': 'application/json' }, 
        { name: petName, age, gender: match, size, characteristics })
    
        if (response.error) {
            const { error } = response
                throw Error(error)
        }
        return response
    })()
}