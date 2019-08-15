function Register(){
	return	`<h1>Register</h1>
				<form method='post' action='register'>
					<label for='name'>Name</label><input type="text" id="name" name="name"/>
					<label for='surname'>Surname</label><input type="text" id="surname" name="surname"/>
					<label for='username'>Email</label><input type="email" id="username" name="username"/>
					<label for='password'>Password</label><input type="password" id="password" name="password"/>
					<label for='repassword'>Repassword</label><input type="password" id="repassword" name="repassword"/>
					<button>Register</button>
				</form>
				<a href='/'>Go back</a>`
	
}

module.exports = Register
