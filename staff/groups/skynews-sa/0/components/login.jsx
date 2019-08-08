function Login({onLogin, onBack, error}){

    return <>
    <main className="login-main">
        <nav className="login-nav">
            <img className="fav-logo-bco" src="style/img/skynews-logo-bco.png"></img> 
            <a href="" className="login-back nav-but" onClick={event => {
            event.preventDefault()

                onBack()
            }}>Go back</a>
        </nav>
        <section className="login-form-section">
            <h1>Login</h1>
            <form className="login-form"    onSubmit={event =>{
                event.preventDefault()
                const{target:{email:{value:email},password:{value:password}}}=event
                onLogin(email,password)
                }}>

            <label>E-mail<input type="email" name="email"></input></label>
            <label>Password<input type="password" name="password"></input></label>
            <button className="login-button">Login</button>
        </form>
    {error && <Feedback message={error} />}
        </section>
    </main>
    </>
}