/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import Context from '../Context'
import logic from '../../logic'


function AdminRegisterProduct() {
    
    const { setView , admin} = useContext(Context)
    let productId=""

    function handleSubmit(event) {
        event.preventDefault()
        const { target: { title: { value: title }, image: { files: [image] }, description: { value: description }, size: { value: size },color: { value: color },price: { value: price } } } = event
        
        handleRegisterProduct(title,image,description,size,color,(parseInt(price)))
    }
    
    async function handleRegisterProduct(title,image,description,size,color,price) {
    
          try {
              debugger
              const response= await logic.registerProduct(title,image,description,size,color,price)
              console.log("PRODUCT REGISTERED")
              debugger
              productId=response.id
              await logic.uploadPhoto(productId,image)
              //setView("login")
          } catch(error) {
              console.log(error.message)
          }
      } 
    
    return <>
        <h2 className="formPanel">Register products</h2>
        <hr></hr>
        {admin===true &&
        <div className="formPanel-form">
        <form enctype="multipath/form-data" onSubmit={handleSubmit} >
            <label>Title:</label>
            <input type="text" name="title" ></input>
            <label>Image:</label>
            <input type="file" name="image" ></input>
            <label>Description:</label>
            <input type="text" name="description" ></input>
            <label>Size:</label>
            <input type="array" name="size" ></input>
            <label>Color:</label>
            <input type="text" name="color" ></input>
            <label>Price:</label>
            <input type="number" name="price" ></input>
            <button className="formPanel-submit">Submit</button>
        </form>
        <a href='/#/admin'><i className="far fa-2x fa-arrow-alt-circle-left addCart-a backArrow"></i></a>
    </div>
        }
        
        
    </>
}

export default AdminRegisterProduct