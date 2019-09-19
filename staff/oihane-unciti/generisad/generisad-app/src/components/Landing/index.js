
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
                            <p><strong>Encuentra lo que necesites</strong></p>
                        </div>
                        <img className= "nav__logo" src={require('../../img/bistro.jpg')} alt="img_00.jpg"></img>
                    </a>
                </section>

                <section class="mosaic__tile">
                <a href={`/#/publish`}>
                        <div class="mosaic__text">
                            <p><strong>Publica tu anuncio</strong></p>
                        </div>
                        <img src={require('../../img/confort.jpg')}alt="img_00.jpg"></img>
                    </a>
                </section> 
            </main>

        <Footer/>

        
    </>
}