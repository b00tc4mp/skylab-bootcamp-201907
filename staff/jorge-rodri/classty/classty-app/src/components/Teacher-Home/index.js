import React, { useContext, useEffect, useState } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function TeacherHome({ history }) {
    debugger
     const { posts, setPosts } = useContext(Context)
     const [update, setUpdate] = useState(false)
    let interval
    debugger
   

    function handleSubmit(event) {
        debugger
        event.preventDefault()
        const { target } = event
        const value = target[0].value
        debugger
        handlePublish(value)
    }
function handleGoToTeacher(event){
    event.preventDefault()
    history.push()
}
    async function retrieveSubId() {
        const user = await logic.retrieveUser()
        debugger
        const subject = await logic.retrieveTeacherHome(user.id);
        return subject._id
    }
    const handleGoToExam=async(event) => {
        event.preventDefault()
        const sub = await retrieveSubId()
        debugger
        history.push(`/subject/exams/${sub}`)
    }

    async function handleGoToHomework(event) {
        event.preventDefault()
        const sub = await retrieveSubId()
        debugger
        history.push(`/subject/homeworks/${sub}`)
    }

    async function handlePublish(value) {

        try {
            debugger
            const user = await logic.retrieveUser()
            debugger
            const subject = await logic.retrieveTeacherHome(user.id);
            debugger
            await logic.createPost(subject._id, value, user.name, user.surname, user.id)
            debugger

            document.getElementById('area').value = ""
            const posts = await logic.retrievePost(subject._id)
            setPosts(posts)
            setUpdate(!update)
        } catch (error) {

            console.log(error.message)
        }
    }

    useEffect(() => {
        async function autoUpdate() {
            debugger
            const user = await logic.retrieveUser()
            debugger
            const _subject = await logic.retrieveTeacherHome(user.id);
        
            debugger
            const posts = await logic.retrievePost(_subject._id);
            setPosts(posts)
        }
            interval = setInterval(function(){
                autoUpdate()
            }, 1000)
            return () => clearInterval(interval)

    }, [update])
 
    debugger
    return <>
        <Header />
        <main>
            <nav>
                <ul>
                    <li><a href='' onClick={handleGoToExam}>Exams</a ></li>
                    <li><a href='' onClick={handleGoToHomework}>Homeworks</a ></li>
                </ul>
            </nav>
            <section>
                <form onSubmit={handleSubmit}>
                    <textarea name="postid" id="area" cols="30" rows="10" placeholder="That you thinking..."></textarea>
                    <button>Publish</button>
                </form>
            </section>
            <section>
                <ul>
                    {posts && posts.length > 0 && posts.map(post =>
                        <li key={post._id}>
                            <h3>{post.name} {post.surname}</h3>
                            <p key={post.message.id}>{post.message.body}</p>

                        </li>
                    )}

                </ul>
            </section>
        </main>
    </>
}
export default withRouter(TeacherHome)