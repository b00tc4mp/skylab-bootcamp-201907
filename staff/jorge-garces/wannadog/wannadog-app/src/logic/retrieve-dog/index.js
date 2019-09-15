export default function (id) {
    // validate fields

    return (async () => {
        const response = await fetch(`http://localhost:8080/api/dog/${id}`, {
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