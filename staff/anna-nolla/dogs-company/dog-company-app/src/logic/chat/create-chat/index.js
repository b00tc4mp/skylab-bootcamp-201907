import { call, validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Create a chat with another participant.
 * 
 * @param {string} this.__token__  (the user needs to be logued in)
 * @param {string} participantId   
 * 
 * @returns {promise} (the chat id)
 */

export default function (participantId) {
    validate.string(this.__token__, 'user id')
    validate.string(participantId, 'participant id')
    
    return (async () => {
        const response = await call(`${REACT_APP_API_URL}/user/chat` , 'post' , { 'authorization': `bearer ${this.__token__}`, 'content-type': 'application/json' }, { participantId })
    
        if (response.error) {
            const { error } = response
                throw Error(error)
        }
        return response 
    })()
}

//response === chatId