
import React, { useState, useContext } from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Nav from "../Nav"
import Footer from "../Footer"
import Feedback from '../Feedback'


function Publish ({history}) {
    let adId
    const  [error, setError]  = useState()

    function handleSubmit(event){
        event.preventDefault()
    
        if (logic.isUserLoggedIn()){
            const { target: { image: {files:[image]},  title:{value:title}, description: {value:description}, price: {value:price}, location:{value:location}}} = event
            onPublish(image, title, description,price, location)
        }
        else{
            history.push('/auth')
        }
    }

    async function onPublish(image, title, description, price, location){
        try{
            let domain = window.location.hostname
            const publish= await logic.publish(image,title, description, price, location, domain)
            adId=publish
            await logic.upload(adId, image)
            history.push("/")

        }catch(message){
            console.log(message)
            const translatedMessage = logic.translateMessage(message.message)
            setError(translatedMessage)

        }
    }
    return  <>
     <Nav/>
        <section class="publish">
            <div class="publish__content">
            <h3 class="publish__title">Publica tu anuncio</h3>

                <form className="publish__form" onSubmit={handleSubmit} method="post" enctype="multipart/form-data" > 
                    <label htmlFor="">Imagen</label>
                    <input class="publish__input"  type="file"  name="image" id="" required />
                    <label htmlFor="">Título del anuncio</label>
                    <input class="publish__input"  type="text" name="title" id=""/>
                    <label htmlFor="">Descrición del producto</label>
                    <textarea class="publish__input--description" type="text" name="description" id=""></textarea>
                    <label htmlFor="">Precio</label>
                    <input class="publish__input"type="text" name="price" id=""/>
                    <label htmlFor="">Localización</label>
                    <input class="publish__input" type="text" name="location" id=""/>
                    {error && <Feedback message={error} />} 
                    <button class= "publish__button">Subir tu anuncio</button>
            </form>
            </div>
        </section>
        <Footer/>  
    </>
}

export default withRouter(Publish)