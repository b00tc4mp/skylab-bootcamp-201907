import validate from '../../utils/validate'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (articleId)  {
     
    validate.string(articleId, 'articleId')

    return(async () => {

        const { token } = sessionStorage
       
        await fetch(`${REACT_APP_API_URL}/user/cart`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json', 'authorization': `bearer ${token}`},
            body: JSON.stringify({articleId})
        })

    })()
}