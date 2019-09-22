/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Login from '../Login'

function Landing() {

    const { credentials, setUser } = useContext(Context)

    useEffect(() => {
        if (credentials) {
          const { id, token } = credentials
          
          async function retrieve() {
            try {
              const { user: userRetrieved } = await logic.retrieveUser(id, token)
              setUser(userRetrieved)
            } catch(error) {
              console.log(error.message)
            }
          } 

          retrieve()
        }
    },[])

  return  <>
    <section className="superior">
      <div className="superior__container">
        <img className="superior__image" alt="" src="https://kttape.es/wp-content/uploads/2019/02/Logo-sense-fons-dreta-blanc.png" />
        <section className="superior__conditions">
          <a className="superior__conditions--privacy"  href="https://kttape.es/privacy-policy/" >Privacy Policy</a>            
          <a className="superior__conditions--terms"  href="https://kttape.es/terms-of-use/" >Terms of Use</a>
        </section>
      </div>
    </section>

    <section>
      <Login />
    </section>

    <footer className="footer">
      <div className="footer__cont">
        <a className="footer__cont--privacity"  href="https://kttape.es/privacy-policy/" >Privacy Policy</a>            
        <a className="footer__cont--terms"  href="https://kttape.es/terms-of-use/" >Terms of Use</a>
      </div>
      <div className="footer__rights"><a  className="footer__rights--a"  href="https://www.kttape.es">© 2016 KTTAPE EUROPE - Todos los derechos reservados</a></div>
    </footer>
  </>
}

export default withRouter(Landing)