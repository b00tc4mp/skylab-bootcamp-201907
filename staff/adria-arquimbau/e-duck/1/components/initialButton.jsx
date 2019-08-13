function InitialButton({ handleVisible }) {
    return <>
        <a href="" onClick={ event =>{
            event.preventDefault()

                
            
            handleVisible("register")
            
        }}>Register</a>

        <a href="" onClick={ event =>{
            event.preventDefault()

           
            handleVisible("login")
            
        }}>Login</a>

        
    </>
}