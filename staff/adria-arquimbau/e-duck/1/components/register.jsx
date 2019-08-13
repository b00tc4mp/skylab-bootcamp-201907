function Register(props){

    return <><form onSubmit = { event => {
        event.preventDefault()

        const { target: { 
            name: { value: name } ,
            surname: { value: surname } ,
            email: { value: email } ,
            password: { value: password }       
        } } = event

        props.onRegister(name, surname, email, password)

        if (__registerOk__ == true) {
            props.onBack()
            __registerOk__ = false
        } else {
            throw Error('error de salto a back')
        }
    }}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
        <label htmlFor="surname">Surname</label>
        <input type="text" id="surname" />
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <button>Submit</button>
    </form>

    <a href="" onClick={ event => {
        event.preventDefault()

        props.onBack()
    }} >Back</a>
    </>
    
}