function Login (props){
    return <>
        <h3>Login</h3>
        <form onSubmit = {event =>{

            event.preventDefault()
            const { target: { username: { value: username }, password: { value: password } } } = event
            props.onLogin(username, password)

        }}>
            <label>Username <input type="text" name="username"/></label>
            <label> Password <input type="password" name="password"/></label>
            <button>Login</button>

        </form>
        <FeedBack message={error}/>
        <a href="" onClick={event=>{
            event.preventDefault()

            onclose()

        }}></a>
    </>
}