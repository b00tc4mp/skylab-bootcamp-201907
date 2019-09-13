export default function () {
    // validate fields

    return (async () => {
        const response = await fetch(`http://localhost:8080/api/user`, {
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