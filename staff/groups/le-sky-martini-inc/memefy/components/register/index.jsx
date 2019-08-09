 /**
 * Registration form panel.
 */

function Register({ onRegister, onBack, error }) {
    return <section className={`register`}>
        <h1 className={`register__title`}>Sign up</h1>
        <form className={`register__form`} onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password }, repassword: { value: repassword} } } = event

            onRegister(name, surname, email, password, repassword)
        }}>
            <ul>
                <li className={`register__item`}>
                    <label><input className={`register__input`} type="text" name="name" placeholder="name"/></label>
                </li>
                <li className={`register__item`}>
                    <label><input className={`register__input`} type="text" name="surname" placeholder="surname" /></label>
                </li>
                <li className={`register__item`}>
                    <label><input className={`register__input`} type="email" name="email" placeholder="email"/></label>
                </li>
                <li className={`register__item`}>
                    <label><input className={`register__input`} type="password" name="password" placeholder="password"/></label>
                </li>
                <li className={`register__item`}>
                    <label><input className={`register__input`} type="password" name="repassword" placeholder="repeat password"/></label>
                </li>
                {error && <Feedback message={error} />}
                <button className={`register__button`}>finish</button>
            </ul>
        </form>
        
        <a className={`register__back`} href="" onClick={event => {
            event.preventDefault()

            onBack()
        }}><i class="fas fa-arrow-left"></i> Go back</a>
    </section>
}