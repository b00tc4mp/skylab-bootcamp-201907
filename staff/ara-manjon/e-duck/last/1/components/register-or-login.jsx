function RegisterOrLogin({currentPage:{login},onRegister, onLogin}) {

    return <div><a href='' onClick={event => {        
        event.preventDefault()
        
           onRegister()  
        }}>Register </a> 
         or<a href='' onClick={event => {        
            event.preventDefault()
            
               lonLogin()
            }}> Login</a>.
            </div>
}