/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Results from '../Results'
import logic from '../../logic'

function Categories({history}) {

    const [cat, setCat] = useState(null)
    
    async function onCategory(category){
        try {
            const response = await logic.retrieveCategory(category)

            setCat(response)
        } catch (error) {
            setCat(error)
        }
    }
 
    return <>
        <section className="categoriesCont">
            <ul className="categoriesCont__ul">
                <div className="dropdownCat">
                    <button className="dropbtnCat">PRO</button>
                    <div className="dropdown-contentCat">
                        <a href="#" onClick={event => { event.preventDefault() 
                            const category = "KTTape Pro Precut"
                            onCategory(category) }}>Pro Precut</a>

                        <a href="#" onClick={event => { event.preventDefault() 
                            const category = "KTTape Pro Uncut" 
                            onCategory(category) }}>Pro Uncut</a>

                        <a href="#" onClick={event => { event.preventDefault() 
                            const category = "KTTape Pro Limited Edition" 
                            onCategory(category) }}>Pro Limited Edition</a>
                            
                        <a href="#" onClick={event => { event.preventDefault() 
                            const category = "KTTape Pro Jumbo Precut" 
                            onCategory(category) }}>Pro Jumbo Precut</a>

                        <a href="#" onClick={event => { event.preventDefault() 
                            const category = "KTTape Pro Jumbo Uncut" 
                            onCategory(category) }}>Pro Jumbo Uncut</a>
                    </div>
                </div>

                <div className="dropdownCat">
                    <button className="dropbtnCat">ORIGINAL</button>
                    <div className="dropdown-contentCat">
                        <a href="#" onClick={event => { event.preventDefault()  
                        const category = "KTTape Original Precut"  
                            onCategory(category) }}>Original Precut</a>

                        <a href="#" onClick={event => { event.preventDefault() 
                        const category = "KTTape Original Uncut" 
                            onCategory(category) }}>Original Uncut</a>

                        <a href="#" onClick={event => { event.preventDefault() 
                        const category = "KTTape Original Jumbo Precut" 
                            onCategory(category) }}>Original Jumbo Precut</a>

                        <a href="#" onClick={event => { event.preventDefault() 
                        const category = "KTTape Original Jumbo Uncut" 
                            onCategory(category) }}>Original Jumbo Uncut</a>

                        <a href="#" onClick={event => { event.preventDefault() 
                        const category = "KTTape Original Jumbo Edema" 
                        onCategory(category) }}>Original Jumbo Edema</a>
                    </div>
                </div>
                <a className="categoriesCont__otherProducts" href="#" onClick={event => { event.preventDefault() 
                const category = "Other Products" 
                        onCategory(category) }}>Other Products</a>  
            </ul>  
      </section>
                {cat && <Results searchResult={cat} />}
    </>
}

export default withRouter(Categories)