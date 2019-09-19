import React , { useState } from 'react'
import { withRouter } from 'react-router-dom'

import Feedback from "../Feedback"

import logic from "../../logic"

import { Link } from "react-router-dom"

function RegisterStudent({ history }){
    
    const [result , setResult] = useState(undefined) // encén feedback panel
    
    function handleSubmit(event){
        event.preventDefault()
        const { target : { name : { value : name } , surname : { value : surname } , birthdate : { value : birthdate } , healthcard : { value : healthcard } } } = event
        handleRegister(name , surname , birthdate , healthcard)
    }

    async function handleRegister(name , surname , birthdate , healthcard){
        try{
            await logic.registerStudent(name , surname , birthdate , healthcard)
            history.push("/process-success")
        }catch({ message }){
            setResult(logic.translateMessage(message))
        }
    }

    return  <div className="form-wrapper">
                <h1 className="home-header">Formulari de registre</h1>
                
                    <form onSubmit={handleSubmit} className="form">
                        <fieldset className="fieldset">
                            <legend className="fieldset__legend">
                            Registra un nou usuari
                            </legend>
                            <section className="fieldset__body">
                                <div className="input-block">
                                    <label className="input-block__label" htmlFor="name">Nom</label>
                                        <input className="input-block__input" type="text" name="name" />
                                </div>
                                <div className="input-block">
                                    <label className="input-block__label" htmlFor="surname">Cognoms</label>
                                        <input className="input-block__input" type="text" name="surname" />
                                </div>
                                <div className="input-block">
                                    <label className="input-block__label" htmlFor="birthdate">Data de naixement</label>
                                        <input className="input-block__input" type="text" name="birthdate" />
                                </div>
                                <div className="input-block">
                                    <label className="input-block__label" htmlFor="healthcard">Targeta sanitària</label>
                                        <input className="input-block__input" type="text" name="healthcard" />
                                </div>
                                <button className="btn btn--submit">Registra</button>
                            </section>
                        </fieldset>
                    </form>
                   
                {result && <Feedback message={result}/>}
                <Link className="btn btn--link" to="/home">Torna</Link>
            </div>
}

export default withRouter(RegisterStudent)
    
              
