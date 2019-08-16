module.exports = function(title,email, password, path) {
    return ` <h1>${title}</h1>
        <form method="POST" action="${path}">
            <label>${email}<input type="email" name="email" /></label>
            <label>${password}<input type="password" name="password"/></label>
            <button>Login</button>
        </form>
        <a href="">Go back</a>`
}


