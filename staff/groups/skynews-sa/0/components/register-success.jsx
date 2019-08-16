function RegisterSuccess({ onLogin }) {
    return <>
    <main className="reg-success">
        <nav className="reg-success__nav">
            <img className="fav-logo-bco" src="style/img/skynews-logo-bco.png"></img> 

        </nav>
        <section className="reg-success__section">
            <p>User successfully registered, you can now proceed to <a href="" onClick={event => {
                    event.preventDefault()

                    onLogin()
                }}>login</a>.
            </p>
        </section>
    </main>
    </>
}