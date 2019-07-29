describe("logic", () => {
	beforeEach(() => {
		users = new Curray()
	})

	describe("register", () => {
		it("should succeed on correct data", () => {
			let user = {
				name: `John-${Math.random()}`,
				surname: `Doe-${Math.random()}`,
				email: `johndoe-${Math.random()}@email.com`,
				password: `123-${Math.random()}`
			}

			logic.register(user.name, user.surname, user.email, user.password)
			let registeredUser = users.pop()
			expect(registeredUser).toEqual(user)
		})

		it("should fail on empty name", () => {
			expect(() => {
				logic.register("", "Doe", "johndoe@email.com", "1234")
			}).toThrowError(Error, "Name is empty or blank.")
		})

		it("should fail on empty surname", () => {
			expect(() => {
				logic.register("John", "", "johndoe@email.com", "1234")
			}).toThrowError(Error, "Surname is empty or blank.")
		})

		it("should fail on empty email", () => {
			expect(() => {
				logic.register("John", "Doe", "", "1234")
			}).toThrowError(Error, "E-mail is empty or blank.")
		})

		it("should fail on empty password", () => {
			expect(() => {
				logic.register("John", "Doe", "johndoe@email.com", "")
			}).toThrowError(Error, "Password is empty or blank.")
		})

		it("should fail on non-valid email", () => {
			expect(() => {
				logic.register("John", "Doe", "aaaa", "1234")
			}).toThrowError(Error, "E-mail is not valid.")
		})

		it("should fail on password with less than 4 characters", () => {
			expect(() => {
				logic.register("John", "Doe", "john@doe.com", "123")
			}).toThrowError(Error, "Password is less than 4 characters.")
		})

		describe("when user already exists", function() {
			let user = {
				name: `John-${Math.random()}`,
				surname: `Doe-${Math.random()}`,
				email: `johndoe-${Math.random()}@email.com`,
				password: `123-${Math.random()}`
			}

			beforeEach(() => {
				users.push(user)
			})

			it("should fail on already existing e-mail", () => {
				expect(() => {
					logic.register(user.name, user.surname, user.email, user.password)
				}).toThrowError(Error, "E-mail is already registered.")
			})
		})
	})

	describe("login", () => {
		var user = {
			name: "John-" + Math.random(),
			surname: "Doe-" + Math.random(),
			email: "johndoe-" + Math.random() + "@mail.com",
			password: "123-" + Math.random()
		}
		beforeEach(function() {
			users.push(user)
		})

		it("should succeed on correct data", () => {
			expect(() => {
				logic.login(user.email, user.password)
			}).not.toThrow()
		})

		it("should fail on empty email", () => {
			expect(() => {
				logic.login("", user.password)
			}).toThrowError("E-mail is empty or blank.")
		})
		it("should fail on empty password", () => {
			expect(() => {
				logic.login(user.email, "")
			}).toThrowError("Password is empty or blank.")
		})

		it("should fail non-valid e-mail", () => {
			expect(() => {
				logic.login("aaa", user.password)
			}).toThrowError("E-mail is invalid.")
		})
		it("should fail on password with less than 4 chars", () => {
			expect(() => {
				logic.login(user.email, "123")
			}).toThrowError("Password is less than 4 characters.")
		})

		it("should fail on non-registered user", () => {
			expect(() => {
				logic.login("random@users.com", "1234")
			}).toThrowError("Wrong credentials.")
		})
	})

	describe("search ducks", function() {
		it("should succeed on matching criteria", function(done) {
			var query = "white" // 12 results

			logic.searchDucks(query, function(ducks) {
				expect(ducks).toBeDefined()
				expect(ducks instanceof Array).toBeTruthy()
				expect(ducks.length).toBe(12)

				ducks.forEach(function(duck) {
					expect(duck.id).toBeDefined()
					expect(duck.title).toBeDefined()
					expect(duck.imageUrl).toBeDefined()
					expect(duck.price).toBeDefined()
				})

				done()
			})
		})
	})

	describe("retrieve duck", function() {
		it("should succeed on valid id", function(done) {
			var id = "5c3853aebd1bde8520e66ee8"

			logic.retrieveDuck(id, function(duck) {
				expect(duck).toBeDefined()
				expect(duck.id).toBe(id)
				expect(duck.title).toBeDefined()
				expect(duck.imageUrl).toBeDefined()
				expect(duck.price).toBeDefined()
				expect(duck.link).toBeDefined()

				done()
			})
		})
	})
})
