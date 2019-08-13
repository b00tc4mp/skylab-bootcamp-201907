function Register({ onRegister, onBack, error }) {
    return <>
        <h1>Register</h1>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password }, repassword: { value: repassword} } } = event

            onRegister(name, surname, email, password, repassword)
        }}>
            <label>Name<input type="text" name="name" /></label>
            <label>Surname<input type="text" name="surname" /></label>
            <label>E-mail<input type="email" name="email" /></label>
            <label>Password<input type="password" name="password" /></label>
            <label>Repeat password<input type="password" name="repassword" /></label>
            <button>Register</button>
        </form>
        {error && <Feedback message={error} />}
        <a href="" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>
    </>
}