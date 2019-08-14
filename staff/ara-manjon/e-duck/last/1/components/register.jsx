 function Register(props) {

return <form onSubmit= {event =>{
    event.preventDefault()
    const { target: { name: { value: name }, surname: { value: surname} , email: {value: email}, password: {value:password}} } = event
    props.onRegister(name, surname, email, password)

}}>
    <label htmlFor="name">
    Name:
    <input type="text" name="name"/>
    Surname:
    <input type="text" name="surname"/>
    E-mail:
    <input type="email" name="email"/>
    Password:
    <input type="password" name="password"/>
    </label>
    <button type= "submit">Register</button>

</form>

} 
