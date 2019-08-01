function Register({ onRegister, onBack }) {
    return <>
        <h1>Register</h1>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } } = event

            onRegister(name, surname, email, password)
        }}>
            <label htmlFor="">Name</label>
            <input type="text" name="name" />
            <label htmlFor="">Surname</label>
            <input type="text" name="surname" />
            <label htmlFor="">Email</label>
            <input type="email" name="email" />
            <label htmlFor="">Password</label>
            <input type="password" name="password" />
            <button>Register</button>
        </form>
        <a href="" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>
    </>
}