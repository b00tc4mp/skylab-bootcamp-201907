import React from 'react'
import { withRouter, Link } from 'react-router-dom'

function Register(){
    return <>
    <section>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input type="name" name="name" />
            <input type="surname" name="surname" />
            <input type="nickname" name="nickname" />
            <input type="email" name="email" />
            <input type="password" name="password" />
            <button>Submit</button>
        </form>
        <Link to="/">Go Back</Link>
    </section>
</>
}

export default Register