import React, { useContext, useEffect } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function ClassList({ history }) {
    const { classes, setClasses, user } = useContext(Context)


    useEffect(() => {
        (async () => {

            const classes = await logic.retrieveClasses();
            setClasses(classes)

        })()
    }, [user])

    return <>
        <Header />
        <main>

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