module.exports = function(path, backPath) {
    return `<h1>Login</h1>
        <form method="post" action="${path}">
            <label>E-mail<input type="email" name="email" /></label>
            <label>Password<input type="password" name="password" /></label>
            <button>Login</button>
        </form>
        <a href="${backPath}">Go back</a>`
}