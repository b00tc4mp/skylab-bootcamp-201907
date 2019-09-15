function RegisterSuccess({ onLogin }) {
    return <p>
        <h2>Thanks for using Goliath, we hope you enjoy it.</h2>
        
         Now you can proceed to<a href="" onClick={event => {
            event.preventDefault()
            onLogin()
        }}>login</a>.
    </p>
}