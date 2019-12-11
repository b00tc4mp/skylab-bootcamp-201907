import { call, validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Update the notification.
 * 
 * @param {string} this.__token__  (the user needs to be logued in) 
 * @param {string} notificationId
 * @param {string} title
 * @param {string} text
 * 
 */

export default function (notificationId, title, text) {
    validate.string(this.__token__, 'user id')
    validate.string(notificationId, 'notification id')
    validate.string(title, 'title')
    validate.string(text, 'text')
    
    return (async () => {
        const response = await call(`${REACT_APP_API_URL}/user/notification/${notificationId}` , 'patch' , { 'authorization': `bearer ${this.__token__}`, 'content-type':'application/json' }, { title, text })
    
        if (response.error) {
            const { error } = response
                throw Error(error)
        }
        return response 
    })()
}