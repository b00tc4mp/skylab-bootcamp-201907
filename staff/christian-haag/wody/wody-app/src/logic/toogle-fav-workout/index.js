const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (workoutId) {
    // validate fields
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/workoutfav/${workoutId}`, {
            method: 'POST',
            headers: {
                authorization: `bearer ${this.__token__}`
            }
        })

        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }

    })()
}