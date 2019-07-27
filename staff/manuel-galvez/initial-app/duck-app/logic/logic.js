const logic = {
	register: (name, surname, email, password) => {
		users.push({
			name: name,
			surname: surname,
			email: email,
			password: password
		})
	},

	login: (email, password) => {
		var user = users.find(function(user) {
			return user.email === email && user.password === password
		})
	}
}
