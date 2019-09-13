import { call, validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL
/**
 * update static location.
 * 
 * @param {string} this.__token__
 * @param {number} longitude 
 * @param {number} latitude
 * 
 */

export default function (longitude, latitude) {

    validate.string(this.__token__, 'user id')
    validate.number(longitude, 'longitude')
    validate.number(latitude, 'latitude')
    
    return (async () => {
        const response = await call(`${REACT_APP_API_URL}/user/static/${longitude}/${latitude}` , 'patch' , { 'authorization': `bearer ${this.__token__}` }, undefined )
    
        if (response.error) {
            const { error } = response
                throw Error(error)
        }
        return 
    })()
}

//'/user/static/:longitude/:latitude'