function Register(props){

    const {
        onGoToLanding,
        onRegister,
        error
    } = props

    return <>
        <div className = "form">

            <h1> Register </h1>

            <form   className = "form__register"
            
                    onSubmit={ event =>{
                        event.preventDefault()
                        
                        const { target : { 
                                name : { value : name },
                                surname : { value : surname },
                                username : { value : username },
                                password : { value : password },
                                repassword : { value : repassword } 

                            }
                        } = event

                        onRegister(name , surname , username , password , repassword)
                    }
                }>

                <label htmlFor = "name">Name
                    <input type="text" name="name" id="name" />
                </label>

                <label htmlFor = "surname">Surname
                    <input type="text" name="surname" id="surname" />
                </label>

                <label htmlFor = "username">Email
                    <input type="email" name="username" id="username" />
                </label>

                <label htmlFor = "password">Password
                    <input type="password" name="password" id="password"/>
                </label>

                <label htmlFor = "repassword">Repeat password
                    <input type="password" name="repassword" id="repassword" />
                </label>

                <button className = "btn btn__submit">Register</button>

            </form>

            <button className = "btn btn__back" onClick={ event => { onGoToLanding() } }>Go back</button>

            {error && <Feedback className = "feedback feedback--error" message = { error }/>}
        </div>
    </>
}