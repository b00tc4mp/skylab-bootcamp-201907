export default function () {
    // validate fields

    return (async () => {

        const response = await fetch(`http://localhost:8080/api/user/favorites`, {
            method: 'get',
            headers: {
                authorization: `bearer ${this.__token__}`
            }
        })

        if (response.status !== 200) {
            const { error } = await response.json()

            throw Error(error)
        }

        const { favorites } = await response.json()

        return favorites
    })()
}