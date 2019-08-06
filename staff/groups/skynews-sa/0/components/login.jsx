function Login({onLogin, onBack, error}){

    return <>
    <form onSubmit={event =>{
        event.preventDefault()
        const{target:{email:{value:email},password:{value:password}}}=event
        onLogin(email,password)
    }}>

    <label>E-mail<input type="email" name="email"></input></label>
    <label>Password<input type="password" name="password"></input></label>
    <button>Login</button>
    </form>
    {error && <Feedback message={error} />}

    <a href="" onClick={event=>{
        event.preventDefault()
        onBack()
    }}>Go Back</a>
    </>
}