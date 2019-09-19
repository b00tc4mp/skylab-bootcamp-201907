const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function () {
    // validate fields

    return (async () => {

        const response = await fetch(`${REACT_APP_API_URL}/user/dogs`, {
            method: 'get',
            headers: {
                authorization: `bearer ${this.__token__}`
            }
        })

        if (response.status !== 200) {
            const { error } = await response.json()

            throw Error(error)
        }

        const { dogs } = await response.json()

        return dogs
    })()
}