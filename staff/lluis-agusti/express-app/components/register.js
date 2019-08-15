function Register(name, surname, email, password, repassword) {
    return `<h1>Register</h1>
    <form action="/register">
        <label>Name<input type="text" name="name" value="${name}"/></label>
        <label>Surname<input type="text" name="surname" value="${surname}" /></label>
        <label>E-mail<input type="email" name="email" value="${email}" /></label>
        <label>Password<input type="password" name="password" value="${password}" /></label>
        <label>Repeat password<input type="password" name="repassword" value="${repassword}" /></label>
        <button>Register</button>
    </form>`
}

module.exports = Register