import React from 'react'

export default function() {

    return <>
      <footer className="footer hidden">
          <ul className="footer__menu">
              <li className="footer__item">e-cohabitat · 2019</li>
              <li className="footer__item"><a className="footer__link" href="#" title="Terms of Service">Terms of Service</a></li>
              <li className="footer__item"><a className="footer__link" href="#" title="Copyright">Copyright</a></li>
              <li className="footer__item"><a className="footer__link" href="#" title="Privacy Policy">Privacy Policy</a></li>
          </ul>  
          <ul className="footer__menu">
              <li className="footer__item"><a href="" className="fab fa-twitter" title="twitter"></a></li>
              <li className="footer__item"><a href="" className="fab fa-facebook-f" title="facebook"></a></li>
              <li className="footer__item"><a href="" className="fab fa-instagram" title="instagram"></a></li>
              <li className="footer__item"><a href="" className="fab fa-youtube" title="youtube"></a></li>
          </ul>      
      </footer>
    </>
}