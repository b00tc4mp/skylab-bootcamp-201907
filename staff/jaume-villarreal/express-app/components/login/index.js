function Login(){
	return	`<h1>Login</h1>
		<form action=''>
            <label for='username'>Email</label><input type="email" id="username" name="username"/>
            <label for='password'>Password</label><input type="password" id="password" name="password"/>
			<button>Login</button>
		</form>
		<a href='/'>Go back</a>`
}

module.exports = Login
