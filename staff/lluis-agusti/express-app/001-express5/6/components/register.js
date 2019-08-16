function Register(title, path, name, surname, email, password, repassword) {
    return `<h1>${title}</h1>
        <form method="post" action="${path}">
            <label>${name}<input type="text" name="name" /></label>
            <label>${surname}Surname<input type="text" name="surname" /></label>
            <label>${email}E-mail<input type="email" name="email" /></label>
            <label>${password}Password<input type="password" name="password" /></label>
            <label>${repassword}Repeat password<input type="password" name="repassword" /></label>
            <button>Register</button>
        </form>
        <a href="">Go back</a>`
}

module.exports = Register