function RegisterLink(props) {
	return (
		<>
			<a href="" onClick={event => {
					event.preventDefault()
					props.onClickRegister()
				}}>Register</a>
		</>
	)
}
