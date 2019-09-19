const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * calls an endpoint to retrieve all post's from db ordered by date.
 * 
 * @returns {Array} all post's from db ordered by date.
 */
export default function () {
    // validate fields

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/posts`, {
            method: 'get',
            headers: {}
        })
        
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }

        const {posts} = await response.json()
        
        return posts
     })()
}