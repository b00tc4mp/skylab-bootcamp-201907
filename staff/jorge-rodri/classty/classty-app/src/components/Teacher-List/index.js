import React, { useContext, useEffect, useState } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function TeacherList({ history }) {
    const { teachers, setTeachers, user } = useContext(Context)
    const [ update, setUpdate ] = useState(false)
    function handleSubmit(event){
        event.preventDefault()
        const {target:{ name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } } = event
        handleRegister(name, surname, email, password)
    }
    
    async function handleRegister(name, surname, email, password){

        try{
            debugger
            await logic.user.registerUser(name, surname, email, password, 'teacher')
            console.log('register with success')
            document.getElementById('clear').value=""
            document.getElementById('clear1').value=""
            document.getElementById('clear2').value=""
            document.getElementById('clear3').value=""
            setUpdate(!update)
        }catch(error){
            
            console.log(error.message)
        }
    }
    function handleBack(event) {
        event.preventDefault()
        history.go(-1)
    }

    debugger
    useEffect(() => {
        (async () => {
            debugger
            const teachers = await logic.retrieveAll('teacher');
            setTeachers(teachers)

        })()
    }, [update])

    return <>
        <Header />
        <main>
            <section>
                <h2>Create teacher</h2>
                <form onSubmit={handleSubmit}>
                    <input id="clear" type="name" name="name" placeholder='name' />
                    <input id="clear1" type="surname" name="surname" placeholder='surname'/>
                    <input id="clear2" type="email" name="email" placeholder='email'/>
                    <input id="clear3" type="password" name="password" placeholder='password'/>
                    <button>Submit</button>
                </form>
                <section>
                </section>
                <h2>Teachers</h2>
                <ul>
                    {teachers && teachers.length > 0 && teachers.map(({ name, surname }) =>

                        <li>{name + " " + surname}</li>
                    )}

                </ul>
            </section>
            <a href='' onClick={handleBack}>Go back</a>
        </main>
    </>
}
export default withRouter(TeacherList)