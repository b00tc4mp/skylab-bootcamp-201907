import logic from ".."

export default function async (){

    return (async () => { 

    const { token } = sessionStorage

        const { role } = await logic.retrieveUser(token)
        if(role === "admin") return true 

    })()
}