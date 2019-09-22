import validate from '../../utils/validate'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (articleId, quantity)  {
    
    quantity = Number(quantity)
    validate.string(articleId, 'articleId')
    validate.number(quantity, 'quantity')

    return(async () => {

        const { token } = sessionStorage
       
        const response = await fetch(`${REACT_APP_API_URL}/user/cart`, {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'authorization': `bearer ${token}`},
            body: JSON.stringify({articleId, quantity})
        })

        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)

        } else {
            return await response.json()
        }

    })()
}