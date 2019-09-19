import React from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'


function Footer (){

    return <>
    <footer class="footer">
        <ul class="footer__menu">

        <li class="footer__list">
            <p className= "footer__title">Contacta con nosotros en <strong>generisad@generis.com</strong><br/>O a través de nuestras redes sociales </p>
            <a href="https://www.facebook.com"><img className="icons_social_media" width="50"  src={require('../../img/iconfinder_Facebook.png')}alt="Facebook.png"></img></a>
            <a href="https://www.pinterest.com"> <img className="icons_social_media" width="50"  src={require('../../img/iconfinder_Pinterest.png')}alt="Pinterest.png"></img></a>
                
            <a href="https://www.twitter.com"><img className="icons_social_media" width="50"  src={require('../../img/iconfinder_Twitter.png')}alt="Twitter.png"></img>
 </a>
            <a href="https://www.youtube.com"><img className="icons_social_media" width="50"  src={require('../../img/iconfinder_Youtube.png')}alt="Youtube.png"></img> </a>
                
            </li>

        <li class="footer__list">
        </li>
        </ul>
        </footer>  
    </>
}

export default withRouter (Footer);