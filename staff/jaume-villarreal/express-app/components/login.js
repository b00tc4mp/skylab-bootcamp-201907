module.exports = function(title, path) {
    return `<h1>${title}</h1>
        <form method="post" action="${path}">
            <label>E-mail<input type="email" name="email" /></label>
            <label>Password<input type="password" name="password" /></label>
            <button>Login</button>
        </form>
        <a href="/">Go back</a>`
}