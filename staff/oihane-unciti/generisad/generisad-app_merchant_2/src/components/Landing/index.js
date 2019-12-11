
import React from 'react'
import Nav from "../Nav"
import Footer from "../Footer"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom } from '@fortawesome/free-solid-svg-icons'

export default function() {
    return <>

        <Nav/>

            <main className="main">
            
                <section class="mosaic__tile">
                    <a href={`/#/ad`}>
                        <div class="mosaic__text">
                            <p><strong>Encuentra tu coche</strong></p>
                        </div>
                        <img className= "nav__logo" src={require('../../img/search.jpg')} alt="img_00.jpg"></img>
                    </a>
                </section>

                <section class="mosaic__tile">
                <a href={`/#/publish`}>
                        <div class="mosaic__text">
                            <p><strong>Vende tu coche</strong></p>
                        </div>
                        <img src={require('../../img/sell.jpg')}alt="img_00.jpg"></img>
                    </a>
                </section> 
            </main>

        <Footer/>

        
    </>
}