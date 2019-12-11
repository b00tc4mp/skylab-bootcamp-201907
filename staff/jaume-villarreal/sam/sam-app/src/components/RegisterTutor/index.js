import React , { useState } from 'react'
import { Link , withRouter } from 'react-router-dom'
import Feedback from '../Feedback'
import logic from '../../logic'
import './index.sass'


function Register({ history }){
    const [error, setError]  = useState(undefined)

    function handleSubmit(event){
        event.preventDefault()
        const { target : { name : { value : name } , surname : { value : surname } , dni : { value : dni } , phone1 : { value : phone1 } , email : { value : email } , password : { value : password } , repassword : { value : repassword } }} = event
        handleRegister(name , surname , dni , phone1 , email , password , repassword)
    }

    async function handleRegister(name , surname , dni , phone1 , email , password , repassword){
        try{
            await logic.registerTutor(name , surname , dni , phone1 , email , password , repassword)
            history.push('/register-success')
        }
        catch({ message }){
            const translatedMessage = logic.translateMessage(message , email )
            setError(translatedMessage)
        }
    }

    return  <div className="form-wrapper">
                <form onSubmit = {handleSubmit} className="form form__register">
                    <fieldset className="fieldset">
                        <legend className="fieldset__legend">
                            Dades del tutor
                        </legend>
                        <section className="fieldset__body">
                            <div className="input-block">
                                <label className="input-block__label" htmlFor="name">Nom</label>
                                    <input className="input-block__input" type="text" name="name"  />
                            </div>
                            <div className="input-block">
                                <label className="input-block__label" htmlFor="surname">Cognoms</label>
                                    <input className="input-block__input" type="text" name="surname"  />
                            </div>
                            <div className="input-block">
                                <label className="input-block__label" htmlFor="dni">DNI</label>
                                    <input className="input-block__input" type="text" name="dni"  />
                            </div>
                            <div className="input-block">
                                <label className="input-block__label" htmlFor="phone1">Telèfon 1</label>
                                    <input className="input-block__input" type="text" name="phone1"  />
                            </div>
                            <div className="input-block">
                                <label className="input-block__label" htmlFor="email">Correu electrònic</label>
                                    <input className="input-block__input" type="text" name="email"  />
                            </div>
                            <div className="input-block">
                                <label className="input-block__label" htmlFor="password">Contrasenya</label>
                                    <input className="input-block__input" type="password" name="password"  />
                            </div>
                            <div className="input-block">
                                <label className="input-block__label" htmlFor="repassword">Confirma la contrasenya</label>
                                    <input className="input-block__input" type="password" name="repassword"  />
                            </div>
                        <button className="btn btn--submit">Registra't</button>
                        </section>
                    </fieldset>
                </form>
                {error && <Feedback message ={error}/>}
                <Link className="btn btn--link" to="/">Torna</Link>
            </div>}

export default withRouter(Register)
