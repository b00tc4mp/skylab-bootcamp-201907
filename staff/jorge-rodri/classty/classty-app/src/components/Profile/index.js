import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function Profile({ history }) {

    const [profile, setProfile] = useState('')

    const [up, setUp] = useState(true)

    const [control, setControl] = useState(false)

    /*     function handleSubmit(event){
            event.preventDefault()
            const {target:{ name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } } = event
            handleRegister(name, surname, email, password)
        } */

        function handleSubmit(event){
            event.preventDefault()
        
                const { target: { image: {files:[image]} }} = event
                onPublish(image)
           
        }
        async function onPublish(image){
            try{
                await logic.uploadPhoto(image)
            }catch(error){
                console.log(error.message)
            }
        }

    function handleEdit(event) {
        event.preventDefault()
        setControl(!control) 
    }

    /*     async function handleRegister(name, surname, email, password){
    
            try{
                
                await logic.registerUser(name, surname, email, password)
                
                history.push('/login')
            }catch(error){
                
                console.log(error.message)
            }
        } */

    useEffect(() => {
        (async () => {
            debugger
            const _id = history.location.pathname.split('/').pop()

            if (_id=='1') {
                const user = await logic.retrieveUser()
                setProfile(user)
            } else {
                const user = await logic.retrieveOther(_id);
                setProfile(user)
                setUp(true)
            }

        })()
    }, [])

    return <>
        <Header />
        <main>
            <h3>{profile.name}</h3>
            <h3>{profile.surname}</h3>
            <h3>{profile.email}</h3>
            {up&& <a href="" onClick={handleEdit}>Edit profile</a>}
        </main>

        {control &&
            <section>
                <h2>Add Photo</h2>
                <form onSubmit={handleSubmit} method="post" enctype="multipart/form-data" > 
                    <label htmlFor="">Image</label>
                    <input  type="file" name="image" id="" />  
                    <button >Add Photo</button>
            </form>
            </section>}
    </>
}
export default withRouter(Profile)