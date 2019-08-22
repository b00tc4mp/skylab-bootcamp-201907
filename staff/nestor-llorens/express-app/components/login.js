function Login(back) {
    return `<h1>Login</h1>
        <form method="post" action="/login">
            <label>E-mail<input type="email" name="email" /></label>
            <label>Password<input type="password" name="password" /></label>
            <button>Login</button>
        </form>
        <a href="${back}">Go back</a>`
}

module.exports = Login