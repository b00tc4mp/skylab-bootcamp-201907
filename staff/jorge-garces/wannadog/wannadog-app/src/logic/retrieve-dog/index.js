const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (id) {
    // validate fields

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/dog/${id}`, {
            method: 'get'
        })

        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }

        const { dog } = await response.json()

        return dog
    })()
}