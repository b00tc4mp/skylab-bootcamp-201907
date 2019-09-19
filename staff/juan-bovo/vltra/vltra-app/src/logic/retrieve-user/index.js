// const { env: { REACT_APP_API_URL } } = process

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * returns an user form db
 * No params, user's id on token
 * 
 * @returns {Object} user's info.
 */
export default function () {
    // validate fields

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'get',
            headers: {
                authorization: `bearer ${this.__token__}`
            }
        })

        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }

        const { user } = await response.json()

        user.avatar = `https://api.adorable.io/avatars/285/${user.nickname}.png`

        return user
     })()
}