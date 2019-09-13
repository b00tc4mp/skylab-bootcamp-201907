import { call, validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL
/**
 * Adding messages to a chat.
 * 
 * @param {string} this.__token__
 * @param {string} chatId 
 * @param {string} text
 * 
 */

export default function (chatId, text) {

    validate.string(this.__token__, 'user id')
    validate.string(chatId, 'chat id')
    validate.string(text, 'message')
    
    return (async () => {
        const response = await call(`${REACT_APP_API_URL}/user/chat/${chatId}` , 'patch' , { 'authorization': `bearer ${this.__token__}` }, { text } )
    
        if (response.error) {
            const { error } = response
                throw Error(error)
        }
        return 
    })()
}
