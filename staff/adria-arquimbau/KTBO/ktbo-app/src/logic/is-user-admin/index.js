import logic from ".."

async function isUserLogged(){

    const { token } = sessionStorage

        const { role } = await logic.retrieveUser(token)
        if(role === "admin") return true 
       
}

export default isUserLogged