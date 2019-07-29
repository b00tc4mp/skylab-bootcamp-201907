const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const logic = {
	register: (name, surname, email, password) => {
		// Input validation
		let errors = ""

		if (!name.trim()) {
			errors += "Name is empty or blank."
		}
		if (!surname.trim()) {
			if (errors) errors += "\n"
			errors += "Surname is empty or blank."
		}

		if (!email.trim()) {
			if (errors) errors += "\n"
			errors += "E-mail is empty or blank."
		} else if (!EMAIL_REGEX.test(email)) {
			if (errors) errors += "\n"

			errors += "E-mail is not valid."
		}

		if (!password.trim()) {
			if (errors) errors += "\n"

			errors += "Password is empty or blank."
		} else if (password.trim().length < 4) {
			if (errors) errors += "\n"
			errors += "Password is less than 4 characters."
		}

		if (errors) throw new Error(errors)
		else {
			// Database check
			const user = users.find(user => {
				return user.email === email && user.password === password
			})

			if (user) throw new Error("E-mail is already registered.")

			users.push({
				name: name,
				surname: surname,
				email: email,
				password: password,
				favorites: []
			})
		}
	},

	login: (email, password) => {
		let errors = ""

		if (!email.trim()) {
			if (errors) errors += "\n"
			errors += "E-mail is empty or blank."
		} else if (!EMAIL_REGEX.test(email)) {
			if (errors) errors += "\n"
			errors += "E-mail is invalid."
		}

		if (!password.trim()) {
			if (errors) errors += "\n"
			errors += "Password is empty or blank."
		} else if (password.trim().length < 4) {
			if (errors) errors += "\n"
			errors += "Password is less than 4 characters."
		}

		if (errors) throw new Error(errors)

		const user = users.find(user => {
			return user.email === email && user.password === password
		})

		if (!user) throw new Error("Wrong credentials.")

		return user
	},

	searchDucks: (query, expression) => {
		if (!query.trim()) {
			throw new Error("Query is empty or blank.")
		}
		call(`http://duckling-api.herokuapp.com/api/search?q=${query}`, expression)
	},

	retrieveDuck: (duckID, expression) => {
		call(`http://duckling-api.herokuapp.com/api/ducks/${duckID}`, expression)
	},

	validateRequest: (results, request) => {
		if (request.status != 201) {
			throw new Error(response["error"])
		}
	},

	favorite: id => {
		const index = loggedUser.favorites.findIndex(fav => fav === id)
		index === -1
			? loggedUser.favorites.push(id)
			: loggedUser.favorites.splice(index, 1)
	},

	retrieveFavorites: expression => {
		const favs = []
		loggedUser.favorites.forEach(duckID => {
			logic.retrieveDuck(duckID, result => {
				const [duck, request] = [...result]
				favs.push(duck)
				if (favs.length === loggedUser.favorites.length) {
					expression(favs)
				}
			})
		})
	}
}
