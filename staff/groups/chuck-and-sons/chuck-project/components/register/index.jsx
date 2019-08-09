function Register(props) {

    const {
        onGoToLanding,
        onRegister,
        error
    } = props

    return <>
        <div className="form">

            <h2> Register </h2>

            <form className="form__landing form--register"

                onSubmit={event => {
                    event.preventDefault()

                    const { target: {
                        name: { value: name },
                        surname: { value: surname },
                        username: { value: username },
                        password: { value: password },
                        repassword: { value: repassword }

                    }
                    } = event

                    onRegister(name, surname, username, password, repassword)
                }
                }>

                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" />


                <label htmlFor="surname">Surname</label>
                <input type="text" name="surname" id="surname" />


                <label htmlFor="username">Email</label>
                <input type="email" name="username" id="username" />


                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />


                <label htmlFor="repassword">Repeat password</label>
                <input type="password" name="repassword" id="repassword" />


                <button className="btn btn__submit">Register</button>

            </form>

            <button className="btn btn__back" onClick={event => { onGoToLanding() }}>Go back</button>

            {error && <Feedback className="feedback feedback--error" message={error} />}
        </div>
    </>
}