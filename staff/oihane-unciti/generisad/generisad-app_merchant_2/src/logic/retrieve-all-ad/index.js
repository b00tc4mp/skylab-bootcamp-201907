import logic from '..'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (domain) {


        return (async () => { 
                const response = await fetch(`${REACT_APP_API_URL}/products/${domain}`)

                if (response.status !== 200) {
                        const { error } = await response.json()
        
                        throw Error(error)
                }
                   
                const res = await response.json()

                return res.ad
                
        
        })()


        
}