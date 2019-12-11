import React from 'react'
import { Link } from 'react-router-dom'

function UpdateSuccess(){
    return   <div className="success-panel">
                <section className="success-panel__wrapper">
                    <p className="success-text">El procés d'actualització s'ha realitzat correctament.</p>
                    <div className="button-set">
                        <Link className="btn btn--success" to="/">Torna</Link>
                    </div>
                </section>
            </div>
}

export default UpdateSuccess