function Login() {
    return `<form action="/">
        <label>E-mail<input type="email" name="email" /></label>
        <label>Password<input type="password" name="password" /></label>
        <button>Login</button>
    </form>`
}

module.exports = Login