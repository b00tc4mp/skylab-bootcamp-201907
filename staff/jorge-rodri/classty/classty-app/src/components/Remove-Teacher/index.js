import React, { useContext, useEffect, useState } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function RemoveTeacher({ history }) {
    const { teachers, setTeachers } = useContext(Context)
    const [update, setUpdate] = useState(false)

    function handleSubmit(event){
        event.stopPropagation()
        const {target:{ value: id } }= event
        debugger
        handleRemoveClass(id)
    }
    async function handleRemoveClass(id){
        try{
            await logic.user.unregisterUser(id)
            setUpdate(!update)
        }catch(error){
            console.log(error.message)
        }
    }

    
    useEffect(() => {
        (async () => {
            
            const teachers = await logic.retrieveAll('teacher');
            setTeachers(teachers)
debugger
        })()
    }, [update])
debugger
    return <>
        <Header />
        <main>

            <section>
                <form onChange={handleSubmit}> 
                    {teachers && teachers.length > 0 && teachers.map(({ name, surname, id }) => {debugger
                            
                            return<>
                            <label>{name+" "+surname}</label>
                            <input type="radio" name="nameClass" value={id}/>
                            </>

                    })}

                 </form>
            </section>
            <Link to={`/admin`}>Go back</Link >
        </main>
    </>
}
export default withRouter(RemoveTeacher)