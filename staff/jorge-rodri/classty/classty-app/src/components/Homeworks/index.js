import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function Homeworks({ history }) {

    const { user, setUser } = useContext(Context)

    const [notDel, setNotDel] = useState(undefined)

    const [del, setDel] = useState(undefined)

    const [update, setUpdate] = useState(false)


    const id = history.location.pathname.split('/').pop()

    function reverse(str) {
        return str.split("-").reverse().join("-");
    }

    function handleSubmit(event) {
        event.preventDefault()
        const { target: { title: { value: title }, comment: { value: comment }, date: { value: date } } } = event 
        debugger
        handleCreateHomeWork(id, title, comment, date)
    }

    async function handleCreateHomeWork(id,title, comment, date){
        try {

            await logic.homework.createHomework(id,title, comment, date)
            debugger
            const del = await logic.homework.retrieveHomeworks(id)
            debugger
            setDel(del)
            setUpdate(!update)

        } catch (error) {

            console.log(error.message)
        }
    }

    function handleNotDone(event) {
        event.preventDefault()
        const { target: { done: { value: idH } } } = event
        debugger
        handleNotDelivery(id, idH)
    }

    async function handleNotDelivery(id, idH) {

        try {

            await logic.notDelivery(id, idH)
            debugger
            const notDel = await logic.homework.retrieveNotDel(id);
            debugger
            setNotDel(notDel)
            const del = await logic.homework.retrieveDel(id)
            debugger
            setDel(del)

        } catch (error) {

            console.log(error.message)
        }
    }

    function handleDone(event) {
        event.preventDefault()
        const { target: { done: { value: idH } } } = event
        debugger
        handleDelivery(id, idH)
    }
    async function handleDelivery(id, idH) {

        try {

            await logic.homework.delivery(id, idH)
            debugger
            const notDel = await logic.homework.retrieveNotDel(id);
            debugger
            setNotDel(notDel)
            const del = await logic.homework.retrieveDel(id)
            debugger
            setDel(del)

        } catch (error) {

            console.log(error.message)
        }
    }

    useEffect(() => {
        (async () => {
            const user = await logic.user.retrieveUser()
            setUser(user)
            if (user && user.type == 'student') {
                debugger
                const notDel = await logic.homework.retrieveNotDel(id);
                debugger
                setNotDel(notDel)
                const del = await logic.homework.retrieveDel(id)
                debugger
                setDel(del)
            } else {debugger
                const del = await logic.homework.retrieveHomeworks(id)
                debugger
                setDel(del)
            }
        })()
    }, [update])
debugger
    return <>
        <Header />
        <main>
            {user && user.type == 'student' &&
                <ul>
                    <h2>To-Do</h2>
                    {notDel && notDel.length > 0 && notDel.map(({ comment, title, expiry, _id }) => {
                        debugger
                        return <li>
                            <h3>{title}</h3>
                            <p>{comment}</p>
                            <time>expiry: {reverse(expiry.slice(0, 9))}</time>
                            <form onSubmit={handleDone}>
                                <button name="done" type="submit" value={_id}>Done</button>
                            </form>
                        </li>
                    }) ||
                        <p>You don´t have homeworks</p>}
                </ul>}
            {user && user.type == 'student' && <ul>
                <h2>Done</h2>
                {del && del.length > 0 && del.map(({ comment, title, expiry, _id }) => {
                    debugger
                    return <li>
                        <h3>{title}</h3>
                        <p>{comment}</p>
                        <time>expiry: {reverse(expiry.slice(0, 9))}</time>
                        <form onSubmit={handleNotDone}>
                            <button name="done" type="submit" value={_id}>Done</button>
                        </form>
                    </li>
                }) ||
                    <p>This field is empty</p>}
            </ul>}
            {user && user.type == 'teacher' &&
                <h2>Create Homework</h2> &&
                <form onSubmit={handleSubmit}>
                    <input type='text' id='ex' name='title' placeholder='title' />
                    <textarea name="comment" id="area" cols="30" rows="5" placeholder="Comment" />
                    <input type='date' id='ex' name='date' placeholder='date' />
                    <button>Create</button>
                </form>}

            {user && user.type == 'teacher' &&
                <ul>
                    <h2>Homeworks</h2>
                    {del && del.length > 0 && del.map(({ comment, title, expiry, delivery }) => {
                        debugger
                        return <li>
                            <h3>{title}</h3>
                            <p>{comment}</p>
                            <time>expiry: {reverse(expiry.slice(0, 9))}</time>
                           <ul>
                               {delivery && delivery.length > 0 && delivery.map(({name, surname})=>
                               <li>
                                   <h4>{name+" "+surname}</h4>
                               </li>
                               )}
                           </ul>
                        </li>
                    })}
                </ul>}


        </main>
    </>
}
export default withRouter(Homeworks)