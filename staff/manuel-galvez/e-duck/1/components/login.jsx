function Login(props) {

	return <>
		<form onSubmit={event => {
			event.preventDefault()
			const {email: {value: email}, password: {value: password}} = event.target
			props.onSubmitLogin(email, password)
		}}>
			<label htmlFor="email">E-mail</label>
			<input type="email" id="email" />
			<label htmlFor="password">Password</label>
			<input type="password" id="password" />
			<button type="submit">Login</button>
		</form>	
		<a href="" onClick={event => {
			event.preventDefault()
			props.onClickBack()
		}}>Back</a>
	</>
}
