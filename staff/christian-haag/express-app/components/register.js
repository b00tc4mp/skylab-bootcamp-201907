function Register(path) {
    return `
            <h2> Register </h2>
            <form action="${path}" method="POST">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" />

                <label htmlFor="surname">Surname</label>
                <input type="text" name="surname" id="surname" />

                <label htmlFor="username">Email</label>
                <input type="email" name="username" id="username" />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                
                <label htmlFor="password">Repassword</label>
                <input type="password" name="repassword" id="repassword" />
                <button type="submit">Register</button>
            </form>
            <a href="">Go back</a>`
}
module.exports = Register