import React, { useContext, useEffect, useState } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function RemoveClass({ history }) {
    const { classes, setClasses } = useContext(Context)
    const [update, setUpdate] = useState(false)

    function handleSubmit(event){
        event.stopPropagation()
        const {target:{ value: nameClass } }= event
        debugger
        handleRemoveClass(nameClass)
    }
    async function handleRemoveClass(nameClass){
        try{
            await logic.classes.removeClass(nameClass)
            setUpdate(!update)
        }catch(error){
            console.log(error.message)
        }
    }

    
    useEffect(() => {
        (async () => {
            
            const classes = await logic.classes.retrieveClasses();
            setClasses(classes)

        })()
    }, [update])

    return <>
        <Header />
        <main>

            <section>
                <form onChange={handleSubmit}> 
                    {classes && classes.length > 0 && classes.map(({ name }) => {
                            
                            return<>
                            <label>{name}</label>
                            <input type="radio" name="nameClass" value={name}/>
                            </>

                    })}

                 </form>
            </section>
            <Link to={`/admin`}>Go back</Link >
        </main>
    </>
}
export default withRouter(RemoveClass)