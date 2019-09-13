/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import Context from '../Context'
import logic from '../../logic'


function UserUpdate() {
    const { setView , credentials} = useContext(Context)

    function handleSubmit(event) {
        event.preventDefault()
        const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } } = event
        const body = {
            name,
            surname,
            email,
            password,
        }
        handleUpdate(body)
    }
    
    async function handleUpdate(body) {
        
          try {
              await logic.updateUser(body)
              setView('registerSuccess')
             
              console.log("user is updated")
          } catch(error) {
              console.log(error.message)
          }
      }
    
    return <>
        <h2 className="formPanel">Update</h2>
        <hr></hr>
        <div className="formPanel-form">
            <form  onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" ></input>
                <label>Surname:</label>
                <input type="text" name="surname" ></input>
                <label>Email:</label>
                <input type="email" name="email" ></input>
                <label>Password:</label>
                <input type="password" name="password" ></input>
                <button className="formPanel-submit">Submit</button>
            </form>
            <a href='/#/profile' onClick=""><i className="far fa-2x fa-arrow-alt-circle-left addCart-a backArrow"></i></a>
        </div>    
    </>
}

export default UserUpdate