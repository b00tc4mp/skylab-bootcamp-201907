function Register({ onSignUp, close, toLogin, error }) {
    return <>
        <h1>BECOME A MOVIE LAB MEMBER</h1>
        <a href="" onClick={event =>{
            event.preventDefault()

            close()
        }}>close</a>
        <form onSubmit={event => {
            event.preventDefault()
            const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password }, repassword: { value: repassword } } } = event
            onSignUp(name, surname, email, password, repassword)
        }}>
            <label><input type="text" name="name" value= "Name"/></label>
            <label><input type="text" name="surname" value= "Surname" /></label>
            <label><input type="email" name="email" value= "Email" /></label>
            <label><input type="password" name="password" value= "Password" /></label>
            <label><input type="password" name="repassword" value="Repeat password" /></label>
            <button>SIGN UP NOW</button>
        </form>
        {error && <Feedback message={error}/>}
        <a href="" onClick={event =>{
            event.preventDefault()

            toLogin()
        }}>LOG IN</a>
    </>
}