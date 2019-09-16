import React, { useContext } from 'react'
import logic from '../../logic'
import { withRouter, Link } from 'react-router-dom'
import Context from '../Context'

function Login({ history }) {

    const { user, setUser, view, setView } = useContext(Context)

    function handleSubmit(event) {
        event.preventDefault()
        const { target: { email: { value: email }, password: { value: password } } } = event
        handleLogin(email, password)
    }

    async function handleLogin(email, password) {
        try {
debugger
            const token = await logic.authenticateUser(email, password)
debugger
            logic.__userCredentials__ = token

            const user = await logic.retrieveUser(token)
            
            logic.__userType__ = user.type
            setUser(user)

            setView('home')

            user && (user.type == 'mentor') && history.push('/admin')

            user && (user.type == 'student') && history.push('/student-home')

            user && (user.type == 'teacher') && history.push('/teacher-home')

        } catch (error) {
            console.log(error.message)
        }
    }
    // {
    // view == 'home' &&
    //     user && (user.type == 'mentor') && history.push('/admin')

    //     user && (user.type == 'student') && history.push('/student-home')

    //     user && (user.type == 'teacher') && history.push('/')
    // }
    return <>
        <section>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" />
                <input type="password" name="password" />
                <button>Submit</button>
            </form>
            <Link to="/">Go Back</Link>
        </section>
    </>
}
export default withRouter(Login)