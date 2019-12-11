import logic from '../../logic'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL


export default function () {

        const token = logic.userCredentials
        let domain = window.location.hostname;
        return (async () => { 
                const response = await fetch(`${REACT_APP_API_URL}/users/message/read/${domain}`, {
                        method: 'get',
                        headers: {authorization: `bearer ${token}`}
                })

                if (response.status !== 200) {
                        const { error } = await response.json()
        
                        throw Error(error)
                }
                const res = await response.json()

                return res.mail
                
        
        })()


        
}