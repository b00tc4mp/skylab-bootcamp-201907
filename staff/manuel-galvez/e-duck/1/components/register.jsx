function Register(props) {

	return <>
		<form onSubmit={event => {
			event.preventDefault()
			const {name: {value: name}, surname: {value: surname}, email: {value: email}, password: {value: password}} = event.target
			props.onSubmitRegister(name, surname, email, password)
		}}>
			<label htmlFor="name">Name</label>
			<input type="text" id="name" />
			<label htmlFor="surname">Surname</label>
			<input type="text" id="surname" />
			<label htmlFor="email">E-mail</label>
			<input type="email" id="email" />
			<label htmlFor="password">Password</label>
			<input type="password" id="password" />
			<button type="submit">Register</button>
		</form>	
		<a href="" onClick={event => {
		event.preventDefault()
		props.onClickBack()
		}}>Back</a>
	</>
}
