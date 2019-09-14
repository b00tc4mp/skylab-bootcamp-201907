const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function () {
    // validate fields

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/posts`, {
            method: 'get',
            headers: {}
        })
        debugger
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }

        const posts = await response.json()
        debugger
        return posts
     })()
}