function LoginLink(props) {
	return (
		<>
			<a href="" onClick={event => {
					event.preventDefault()
					props.onClickLogin()
				}}>Login</a>
		</>
	)
}
