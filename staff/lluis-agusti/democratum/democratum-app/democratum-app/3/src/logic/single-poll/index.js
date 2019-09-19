//import validate from '../../utils/validate'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (selectedPoll) {

const { token } = sessionStorage

    return (async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/polls/${selectedPoll}`, {
            method: 'GET',
            headers: {'authorization': `bearer ${token}` }
        })
        
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            return await response.json()
        }
    })()
}









//import validate from '../../utils/validate'
/* const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (pollId) {

const { token } = sessionStorage

    return (async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/polls/${pollId}`, {
            method: 'GET',
            headers: {'authorization': `bearer ${token}` }
        })
        
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            return await response.json()
        }
    })()
} */


// const { env: { REACT_APP_API_URL } } = process

/* const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function () {

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/polls/`, {
            method: 'get',
            headers: {
                authorization: `bearer ${this.__token__}`
            }
        })

        if (response.status !== 200) {
            const { error } = await response.json()

            throw Error(error)
        }

        const { user } = await response.json()

        return user
     })()
} */






/* logic.retrieveDuck = function(id, token, duckId, expression) {

        validate.string(duckId, 'duck id')
        validate.function(expression, 'expression')

        call('http://duckling-api.herokuapp.com/api/ducks/' + duckId, undefined, undefined, undefined, (error, duck) => {
            if (error)
                expression(new Error(`cannot retrieve duck with id ${duckId}`))
            else if (duck.error) expression(new Error(duck.error))
            else expression(undefined, duck)
        })
    }
} */