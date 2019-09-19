const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function () {
    // validate fields

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/calcworkout`, {
            method: 'post',
            headers: {
                authorization: `bearer ${this.__token__}`
            }
        })

        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }

        const result = await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'get',
            headers: {
                authorization: `bearer ${this.__token__}`
            }
        })

        const { user } = await result.json()
        return user
    })()
}