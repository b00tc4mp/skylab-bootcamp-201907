import React, { useContext, useEffect } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function ClassList({ history }) {
    const { classes, setClasses, user } = useContext(Context)

 function handleSubmit(event){
        event.preventDefault()
        debugger
        const {target:{ nameClass: { value: nameClass } } } = event
        handleRegister(nameClass)
    }
    
    async function handleRegister(nameClass){

        try{
            
            await logic.classes.registerClass(nameClass)
            
            document.getElementById('a').value = ''
        }catch(error){
            
            console.log(error.message)
        }
    }
    useEffect(() => {
        (async () => {

            const classes = await logic.classes.retrieveClasses();
            setClasses(classes)

        })()
    }, [user])

    return <>
        <Header />
        <main>
        <section>
        <h2>Create Class</h2>
        <form onSubmit={handleSubmit}>
            <input type="name" id='a' name="nameClass" placeholder="name subject"/>
            <button>Submit</button>
        </form>
        </section>
            <section>
                <ul>


                    {classes && classes.length > 0 && classes.map(({ name }) =>


                        <li>{name}</li>

                    )}
                </ul>
            </section>
            <Link to={`/admin`}>Go back</Link >
        </main>
    </>
}
export default withRouter(ClassList)