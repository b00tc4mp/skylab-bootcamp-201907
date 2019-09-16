import React, { useContext, useEffect } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function ClassList({ history }) {
    const { classes, setClasses } = useContext(Context)
    
    function handleSubmit(event){
        event.stopPropagation()
        const {target:{ value: nameClass } }= event
        debugger
        handleRemoveClass(nameClass)
    }
    async function handleRemoveClass(nameClass){
        try{
            await logic.removeClass(nameClass)
        }catch(error){
            console.log(error.message)
        }
    }

    
    useEffect(() => {
        (async () => {
            
            const classes = await logic.retrieveClasses();
            setClasses(classes)

        })()
    }, [classes])

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
export default withRouter(ClassList)