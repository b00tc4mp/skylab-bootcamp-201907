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
    <a href="/#/"><i className="far fa-2x fa-arrow-alt-circle-left addCart-a backArrow"></i></a>
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
                }}>><i class="far fa-times-circle"></i></li>
                <li className="userCart-description">{item.product.title}</li>
                <li className="userCart-description"><img src={item.product.image}/></li>
                <li className="userCart-description">{'Size: ' + item.product.size}</li>
                <li className="userCart-description">{item.product.description}</li>
                <li className="userCart-description">{'Color:' + item.product.size}</li>
                <li className="userCart-description">{'Price:' + item.product.price + " €"}</li>
                <li className="userCart-description">{'Quantity: ' + item.quantity}</li>
                <li className="userCart-description">{'Total: '+(total+=(item.product.price*item.quantity))+ " €"}</li>
                
              </ul>
            </>
          }
          )}
        </ul>
        <h2>Total:</h2><p>{total + " JOSETAS"}</p>
        

        <button className="formPanel-submit-buy" onClick={handleCheckout} >Checkout</button>
      </div>
    }
  </>
}

export default UserCart