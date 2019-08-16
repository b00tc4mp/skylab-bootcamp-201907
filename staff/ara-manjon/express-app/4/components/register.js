function Register(title, name,surname, email, password, repassword, path) {
    return `<section>
        <h1>${title}</h1>
        <form method="post" action="${path}">
            <label>${name}<input type="text" name="name" /></label>
            <label>${surname}<input type="text" name="surname" /></label>
            <label>${email}<input type="email" name="email" /></label>
            <label>${password}<input type="password" name="password"/></label>
            <label>${repassword}<input type="password" name="repassword" /></label>
            <button>Register</button>
        </form>
        <a href="">Go Back</a>
    </section>`
}

module.exports = Register



