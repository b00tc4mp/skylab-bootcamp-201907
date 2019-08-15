function Register(name, surname, username, password) {
    return `<div>
            <h2> Register </h2>
            <form action="/register" method="POST">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" />

                <label htmlFor="surname">Surname</label>
                <input type="text" name="surname" id="surname" />

                <label htmlFor="username">Email</label>
                <input type="email" name="username" id="username" />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />

                <button type="submit">Register</button>

            </form>
            </div>`
}
module.exports = Register