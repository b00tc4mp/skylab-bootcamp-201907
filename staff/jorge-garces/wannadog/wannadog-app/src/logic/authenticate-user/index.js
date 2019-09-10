export default function (email, password) {
    // validate fields

    return (async () => {
        const response = await fetch(`http://localhost:8080/api/auth`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        if (response.status === 200) {
            const { token, id } = await response.json()

            return { token, id }
        }

        const { error } = await response.json()

        throw Error(error)
    })()
}