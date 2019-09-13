import React, { useContext, useEffect } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"


function UserCart() {
  const { cart, setCart,setView,view } = useContext(Context)
  let total=0

  useEffect(() => {
    (async () => {
      try {
        const cart = await logic.retrieveCart()
        setCart(cart)
      } catch (error) {
        console.log(error.message)
      }
    })()
  }, [cart])

  async function handleUpdateCart(productId) {
    try {
      await logic.updateCart(productId)
    } catch (error) {
      console.log("error", error.message)
    }
  }

  function handleCheckout(event) {
    event.preventDefault()
    handlePlaceOrder()
  }
  async function handlePlaceOrder() {

    try {
      await logic.placeOrder()
      setView("success")
    } catch (error) {
      console.log(error.message)
    }
  }


  return <>
    {view==="success" && <Redirect to="/profile/success"/>}
    {cart && cart instanceof Array &&
      <div>
        <ul>
          {cart.map(item => {
            return <>
              <ul className='userCart'>
                <li onClick={event => {
                  event.preventDefault()
                  
                  let productId = item.product._id
                  handleUpdateCart(productId)
                }}><i class="far fa-times-circle"></i></li>
                <li className="userCart-title">{item.product.title}</li>
                <li className="userCart-description"><img src={item.product.image}/></li>
                <li className="userCart-description">{'Size: ' + item.product.size}</li>
                <li className="userCart-description">{'Color:' + item.product.size}</li>
                <li className="userCart-description">{'Price:' + item.product.price + " €"}</li>
                <li className="userCart-description">{'Quantity: ' + item.quantity}</li>
                <li className="userCart-hidden">{'Total: '+(total+=(item.product.price*item.quantity))+ " €"}</li>         
              </ul>
            </>
          }
          )}
        </ul>
        <h3 className="userCart-total">Total: {total + " €"}</h3>
        

        <button className="formPanel-submit-buy" onClick={handleCheckout} >Checkout</button>
        <p><a href="/#/"><i className="far fa-2x fa-arrow-alt-circle-left addCart-a userCart-backArrow"></i></a></p>

      </div>
    }
  </>
}

export default UserCart