import React, { useContext, useEffect, useState } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function Subject({ history }) {
    const { posts, setPosts, user, setUser } = useContext(Context)
    let interval
    const [ update, setUpdate ] = useState(false)
    const id = history.location.pathname.split('/').pop()

    function handleSubmit(event) {

        event.preventDefault()
        const { target } = event
        const value = target[0].value

        handlePublish(value)
    }

    async function handlePublish(value) {

        try {

            const user = await logic.user.retrieveUser()
            setUser(user)
            await logic.post.createPost(id, value, user.name, user.surname, user.id)
            document.getElementById('area').value = ""
            const posts = await logic.post.retrievePost(id)
            setPosts(posts)
            setUpdate(!update)
        } catch (error) {

            console.log(error.message)
        }
    }

        useEffect(() => {
            async function posts(){
                const posts = await logic.post.retrievePost(id);
                debugger
                setPosts(posts)
            }
            posts()
            async function autoUpdate() {
                debugger
                const posts = await logic.post.retrievePost(id);
                debugger
                setPosts(posts) 
            }
            /*     interval = setInterval(function(){
                    autoUpdate()
                }, 3000)
                return () => clearInterval(interval) */
    
        }, [update])

    return <>
        <Header />
        <main>
            <nav>
                <ul>
                    <li><Link to={`/subject/exams/${id}`}>Exams</Link ></li>
                    <li><Link to={`/subject/homeworks/${id}`}>Homeworks</Link ></li>
                </ul>
            </nav>
            <Link to="/student-home">Go Back</Link >
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
export default withRouter(Subject)