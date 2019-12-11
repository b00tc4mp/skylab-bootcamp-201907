import { call, validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieve all chats a user has.
 * 
 * @param {string} this.__token__  (the user needs to be logued in)
 * @param {string} chatId
 *
 * @returns {promise} 
 */

export default function (chatId) {
    validate.string(this.__token__, 'user id')
    validate.string(chatId, 'chat id')
    
    return (async () => {
        const response = await call(`${REACT_APP_API_URL}/user/chat/${chatId}` , 'get' , { 'authorization': `bearer ${this.__token__}` }, undefined)
    
        if (response.error) {
            const { error } = response
                throw Error(error)
        }
        const {chat: { messages } } = response
        return messages 
    })()
}