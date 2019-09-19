const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function(){
    return(async () => {
        const headers = {'authorization' : `bearer ${this.__token__}`}
        const studentsArray = await fetch(`${REACT_APP_API_URL}/tutors/students` , {
            method : 'GET',
            headers: headers
        })
        if(studentsArray.status !== 200){
            const { error } = await studentsArray.json()
            throw new Error (error)
        }else{
            return await studentsArray.json()
        }

    })()
}
