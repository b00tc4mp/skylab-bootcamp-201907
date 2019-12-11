import { call, validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Updates a pet.
 * 
 * @param {string} this.__token__
 * @param {string} petId 
 * @param {string} petName
 * @param {date} age
 * @param {boolean} gender
 * @param {string} size
 * @param {string} characteristics
 * 
 * @returns {Promise}
 */

export default function (petId, petName, age, gender, size, characteristics) {
    validate.string(this.__token__, 'user id')
    validate.string(petId, 'pet id')
    validate.string(petName, 'pet name')
    validate.date(age, 'age')
    validate.boolean(gender, 'gender')
    validate.string(size, 'size')
    validate.string(characteristics, 'characteristics')

    return (async () => {
        const response = await call(`${REACT_APP_API_URL}/user/pet/${petId}` , 'patch' , { 'authorization': `bearer ${this.__token__}` }, { petName,  age, gender, size, characteristics})
    
        if (response.error) {
            const { error } = response
                throw Error(error)
        }
        return 
    })()
}
