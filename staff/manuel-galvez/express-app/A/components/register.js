function Register() {
   return `<h1>Register</h1>
            <form method="POST" action="/register">
                <label>Name<input type="text" name="name" /></label>
                <label>Surname<input type="text" name="surname" /></label>
                <label>E-mail<input type="email" name="email" /></label>
                <label>Password<input type="password" name="password" /></label>
                <label>Repeat password<input type="password" name="repassword" /></label>
           <button>Register</button>
       </form>`
}

module.exports = Register 