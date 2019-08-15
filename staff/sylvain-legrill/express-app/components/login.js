function Login({ email, password}) {
    return ` <form method="POST" action="/login">
            <label>E-mail<input type="email" name="email" /></label>
            <label>Password<input type="password" name="password" /></label>
            <button>Login</button>
        </form>`
   
}

module.exports = Login

