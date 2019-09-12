import React, { useContext, useEffect, useState } from 'react'
import Context from '../Context'
import logic from '../../logic'

function UserCart() {
  const { credentials, setView, view, products, setProducts, productQuery, setProductQuery, cart, setCart } = useContext(Context)

  useEffect(() => {
    (async () => {
      try {
        const cart = await logic.retrieveCart()

        console.dir(cart)

        setCart(cart)
      } catch (error) {
        console.log(error.message)
      }
    })()
  }, [cart])



  async function handleUpdateCart(productId) {
    try {
      await logic.updateCart(productId)
      console.log("cart is updated")
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
      console.log("order is placed")
    } catch (error) {
      console.log(error.message)
    }
  }


  return <>
    <a href="/#/"><i className="far fa-2x fa-arrow-alt-circle-left addCart-a backArrow"></i></a>
    {console.log('hola mundo')}
    {console.dir(cart)}
    {cart && cart instanceof Array &&
      <div>
        <ul>
          {cart.map(item => {
            return <>
              <ul className='userCart'>
                <li onClick={event => {
                  event.preventDefault()
                  debugger
                  let productId = item.product._id
                  handleUpdateCart(productId)
                }}>><i class="far fa-times-circle"></i></li>
                <li className="userCart-description">{'ProductId' + item.product._id}</li>
                <li className="userCart-quantity">{'Quantity' + item.quantity}</li>
              </ul>
            </>
          }
          )}
        </ul>
        <button className="formPanel-submit-buy" onClick={handleCheckout} >Checkout</button>
      </div>
    }
  </>
}

export default UserCart