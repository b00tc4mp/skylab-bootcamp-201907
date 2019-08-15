function Login(path) {
    return `<h1>Login</h1>
    <form action="${path}" method="POST">
    
        <label htmlFor="username">E-mail</label>
        <input type="email" name="username" id="username" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password"/>
        <button type="submit">Login</button>
    </form>
    <a href=">Go back</a>`
}

module.exports = Login