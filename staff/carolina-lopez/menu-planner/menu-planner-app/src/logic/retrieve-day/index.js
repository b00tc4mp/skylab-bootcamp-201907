const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (id) {
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/days/${id}`, {
            method: 'get',
            headers: {
                authorization: `bearer ${this.__token__}`
            }
        })

        if (response.status !== 200) {
            const { error } = await response.json()

            throw Error(error)
        }

        const { day } = await response.json()

        return day
     })()
}