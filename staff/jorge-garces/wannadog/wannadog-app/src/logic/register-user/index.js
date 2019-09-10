export default function (name, surname, email, password) {
    // validate fields

    return (async () => {
        const response = await fetch(`http://localhost:8080/api/users`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ name, surname, email, password })
        })

        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }
    })()
}