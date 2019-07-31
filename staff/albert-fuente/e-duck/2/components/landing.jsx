const { Component } = React

class Landing extends Component {
  constructor() {
      super()

      this.state = { ducks: [], duck: undefined , login: false, register:false},
      

      this.handleSearch = this.handleSearch.bind(this)
      this.handleRetrieveDuck = this.handleRetrieveDuck.bind(this)
      this.handleRegister = this.handleRegister.bind(this)
      this.handleLogin = this.handleLogin.bind(this)
      this.hanldeFavourites=this.hanldeFavourites.bind(this)
    }

    handleSearch(query) {
      logic.searchDucks(query, (error, ducks) => {
          if (error) console.error(error)
          else this.setState({ ducks })
      })
  }
  
    handleRetrieveDuck(id) {
        logic.retrieveDuck(id, (error, duck) => {
            if (error) console.error(error)
            else this.setState({ duck })
        })
    }

    handleRegister(name, surname, email, password){
        try{
            logic.register(name, surname, email, password)
            console.log('registerrrr')
        }
        catch(error){
            console.log(error)
        }
    }

    handleLogin(email, password) {
        try{
            logic.login(email, password)
            this.setState( {login: true} )
            console.log("hoola")
        }
        catch(error){
            console.log(error)
        }
    }
    hanldeFavourites(email, id){
        try{
            logic.addDuckToFavorites(email,id)
            console.log("added")


        }catch(error){
            console.log(error)
        }

    }



  render() {
    return <>
        <Search onSearch={this.handleSearch} />

        {!this.state.duck ?
                <Results items={this.state.ducks} paintItem={duck => {
                    return <DuckItem duck={duck} />
                }} onItem={this.handleRetrieveDuck} />
                :
                <DuckDetail addFav={this.hanldeFavourites} duck={this.state.duck} onBack={() => this.setState({ duck: undefined})} />}
        
            <Initial initial={this.state.initial}/> 
        
        
        {this.state.register && <Register onRegister={this.handleRegister}/>}
            {/* <Register onRegister={this.handleRegister}/> */}
            <RegisterSuccess initial={this.state.initial}/> 

            <Login login={this.handleLogin} isLogin={this.state.login}  />
            
    </>
}
}


function Register(props) {
    return (
      <form
        onSubmit={event => {
          event.preventDefault()
  
          const {
            target: {
              name: { value: name },
              surname: { value: surname },
              email: { value: email },
              password: { value: password }
            }
          } = event
  
          props.onRegister(name, surname, email, password)
        }}
      >
        <input type='text' id='name' placeholder='name'/>
        <input type='text' id='surname' placeholder='surname'/>
        <input type='text' id='email' placeholder='email'/>
        <input type='password' id='password' placeholder='password'/>
        <button>🔍</button>
        <a href='' onClick={event=>{
            event.preventDefault()
            onBack()
        }}>Go back</a>
      </form>
    )
  }


function Login(login,onBack) {
    return <form onSubmit={event => {
        event.preventDefault()
  
        const { target: { email: { value : email}, password: {value: password} } } = event
        //PROPS no cal posar directament ho pases com argument el login dins la funcio 
        login(email, password)
    }}>
        <input type="email" name="email" placeholder="email"/>
        <input type="password" id="password" placeholder="password"/>
        <button>Login</button>
        <a href="" onClick={event=>{
            event.preventDefault()
            onBack()
        }}>Go Back</a>
    </form>
  }


function Initial(props) {
    return <> 
    <a href="" onClick={ event => {
        event.preventDefault()

        console.log('register')
        this.setState({register:true})
    }}>Register</a>  o 
    
    <a href="" onClick={ event => {
        event.preventDefault()
    console.log('login')    
    }}>Login</a>
    </>
}

function RegisterSuccess(onLogin) {
    return <> Ok, registered succeeded, you can now proceed to
    <a href="" onClick={ event => {
        event.preventDefault()

        console.log('Going to login')
        onLogin()
    }}>Login</a> 
    
    </>
}

