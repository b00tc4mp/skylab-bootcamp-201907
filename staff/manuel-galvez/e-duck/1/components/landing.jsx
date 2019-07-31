const { Component } = React


class Landing extends Component {
	constructor() {
		super()

		this.state = { ducks: [], duck: undefined, user: undefined, currentPage: 'landing' }

		this.handleSearch = this.handleSearch.bind(this)
		this.handleRetrieveDuck = this.handleRetrieveDuck.bind(this)
		this.handleFavorites = this.handleFavorites.bind(this)
		this.handleRegister = this.handleRegister.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
	}

	handleSearch(query) {
		logic.searchDucks(query, (error, ducks) => {
			if (error) console.error(error)
			else this.setState({ ducks })
		})
	}

	handleRegister(name, surname, email, password) {
        logic.register(name, surname, email, password);
        //register.showFeedback(error.message);
	}

	handleLogin(email, password) {
		try {
			const loggedUser = logic.login(email, password);
			this.setState({user: loggedUser, currentPage: 'landing'})
		} catch(error) {
			console.log(error)
		}
	}

	handleRetrieveDuck(id) {
		logic.retrieveDuck(id, (error, duck) => {
			if (error) console.error(error)
			else this.setState({ duck })
		})
	}

	handleFavorites(id) {
		logic.addDuckToFavorites(this.state.user.email, id, error => {
			if (error) console.error(error)
			console.log(`${id} added successfully `)
		})
	}

	render() {
		return <>
			{this.state.currentPage === 'landing' && <Search onSearch={this.handleSearch} />}
			{this.state.currentPage === 'landing' && <LoginLink onClickLogin={() => this.setState({ currentPage: 'login' })} />}
			{this.state.currentPage === 'landing' && <RegisterLink onClickRegister={() => this.setState({ currentPage: 'register' })} />}

			{this.state.currentPage === 'register' && <Register onSubmitRegister={this.handleRegister} onClickBack={() => this.setState({ currentPage: 'landing' })} />} 
			{this.state.currentPage === 'login' && <Login onSubmitLogin={this.handleLogin} onClickBack={() => this.setState({ currentPage: 'landing' })} />}


			{!this.state.duck ?
				this.state.currentPage === 'results' && <Results items={this.state.ducks} paintItem={duck => {
					return <DuckItem duck={duck} onFavorite={this.handleFavorites} loggedUser={this.state.user} loginRedirection={() => this.setState({ currentPage: 'login'})}/>
				}} onItem={this.handleRetrieveDuck} />
				:
				this.state.currentPage === 'detail' && <DuckDetail duck={this.state.duck} onBack={() => this.setState({ duck: undefined })} addFavorite={this.handleFavorites} />}
		</>
	}
}

