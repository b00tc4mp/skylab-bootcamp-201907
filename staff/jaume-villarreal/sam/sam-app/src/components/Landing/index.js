import React from 'react'
import { Link } from 'react-router-dom'

import "./index.sass"

function Landing (){
    return  <section className="landing">
                <h1 className="landing__header">sam</h1>
                <ul className = "landing__form">
                    <li className="landing__link">
                        <Link  to="/register">Registra't</Link>
                    </li>
                    <li className="landing__link">
                        <Link to="/login">Accedeix</Link>
                    </li>
                </ul>
            </section>
}

export default Landing