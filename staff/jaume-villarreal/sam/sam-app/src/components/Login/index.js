import React , { useState } from 'react'
import { Link , withRouter } from 'react-router-dom'
import Feedback from '../Feedback'
import logic from '../../logic'
import './index.sass'


function Login({ history }){
    const  [error, setError]  = useState()

    function handleSubmit(event){
        event.preventDefault()
        const { target : { email : { value : email } , password : { value : password } } } = event
        handleLogin(email , password)
    }

    async function handleLogin(email , password){
        try{
            await logic.authenticateTutor(email , password)
            history.push('/home')
        }
        catch({ message }){
            let translatedMessage = logic.translateMessage(message , email)
            setError(translatedMessage)
        }
    }

    return  <div className="form-wrapper form-wrapper--login">
                <form onSubmit = {handleSubmit} className="form form__register">
                    <fieldset className="fieldset">
                        <legend className="fieldset__legend">
                            Dades d'accés
                        </legend>
                        <section className="fieldset__body">
                            <div className="input-block">
                                <label className="input-block__label" htmlFor="email">Correu electrònic</label>
                                    <input className="input-block__input" type="text" name="email"  />
                            </div>
                            <div className="input-block">
                                <label className="input-block__label" htmlFor="password">Contrassenya</label>
                                    <input className="input-block__input" type="password" name="password"  />
                            </div>
                        <button className="btn btn--submit">Accedeix</button>
                        </section>
                    </fieldset>
                </form>
                {error && <Feedback message ={error}/>}
                <Link className="btn btn--link" to="/">Torna</Link>

            </div>
}

export default withRouter(Login)
