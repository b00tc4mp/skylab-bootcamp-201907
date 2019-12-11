// const { env: { REACT_APP_API_URL } } = process

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

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

        return user
     })()
}