function Login() {
    return `<section>
        <h1>Login</h1>
        <form method="POST" action="/login">
            <label>E-mail<input type="email" name="email" /></label>
            <label>Password<input type="password" name="password"/></label>
            <button>Login</button>
        </form>
    </section>`
}

module.exports = Login

