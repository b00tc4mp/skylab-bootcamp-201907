function Register({onRegister, onBack, error}){
    
    return <>
    <main className="register-main">
        <nav className="register-nav">
            <img className="fav-logo-bco" src="style/img/skynews-logo-bco.png"></img> 
            <a href="" className="register-back nav-but" onClick={event => {
            event.preventDefault()

                onBack()
            }}>Go back</a>
        </nav>
        <section className="register-form-section">
            <h1>Register</h1>
            <form className="register-form" onSubmit={event => {
                event.preventDefault()

                const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password }, repassword: { value: repassword} } } = event

                onRegister(name, surname, email, password, repassword)
                }}>
                <label>Name<input type="text" name="name" /></label>
                <label>Surname<input type="text" name="surname" /></label>
                <label>E-mail<input type="email" name="email" /></label>
                <label>Password<input type="password" name="password" /></label>
                <label>Repeat password<input type="password" name="repassword" /></label>
                <button className="register-button">Register</button>
            </form>
            
             {error && <Feedback message={error} />}
            
        </section>
    </main>
    </>

}