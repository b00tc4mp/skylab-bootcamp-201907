const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function(){
    return(async () => {
        const headers = {'authorization' : `bearer ${this.__token__}`}
        const tutor = await fetch(`${REACT_APP_API_URL}/tutors` , {
            method : 'GET',
            headers: headers
        })
        if(tutor.status !== 200){
            const { error } = await tutor.json()
            throw new Error (error)
        }else{
            return await tutor.json()
        }

    })()
}
