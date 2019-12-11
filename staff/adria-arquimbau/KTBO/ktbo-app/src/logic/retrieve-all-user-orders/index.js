const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function () {

    return (async () => {

        const { token } = sessionStorage

        const response = await fetch(`${REACT_APP_API_URL}/user/orders`, {
            method: 'GET',
            headers: {'authorization': `bearer ${token}` }
        })
        
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        } else {
            return await response.json()
        }

    })()
}