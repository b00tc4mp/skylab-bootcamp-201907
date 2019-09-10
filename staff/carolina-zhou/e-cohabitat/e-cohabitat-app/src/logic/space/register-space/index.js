import { validate } from 'utils'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Registers a space
 * 
 * @param {*} title 
 * @param {*} type 
 * @param {*} picture 
 * @param {*} address 
 * @param {*} passcode 
 * @param {*} id 
 * 
 * @returns {}
 */

export default function (title, type, picture, address, passcode, id) {

    validate.string(title, 'space name')
    validate.string(type, 'space type')
    validate.string(picture, 'picture')
    validate.string(address, 'space address')
    validate.string(passcode, 'space passcode')
    validate.string(id, 'creator-user id')
    
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/${id}/spaces`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ title, type, picture, address, passcode, id })
        })

        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }
    })()
}
