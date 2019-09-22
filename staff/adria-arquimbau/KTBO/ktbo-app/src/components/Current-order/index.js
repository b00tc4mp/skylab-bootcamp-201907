/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import logic from '../../logic'
import ResultsCart from './ResultsCart'

function CurrentOrder() {

  //const [error, setError] = useState(null)
  const [items, setItems] = useState(null)
 
  useEffect(() => {
    handleCart()
  },[])

  async function handleCart() {
    
    try {
      (async () => {
        const { cart } = await logic.retrieveUser()
        try{
          if(cart) {
            let items = await Promise.all(cart.map(item => logic.retrieveArticle(item.article)))
            items = items.map( (item,index) => {
            return { item, quantity: cart[index].quantity}
          })
          setItems(items)
          }
        }catch(error){
          //TODO
        }
      })()
 
    } catch (error) {
      //TODO SetError(error)
    }
  }

    return <>
        <section className="currentOrder">
          {items && <ResultsCart cart={items} retrieverCart={handleCart}/>} 
          <h4 className="currentOrder__title">Current Order</h4>    
        </section>
    </>
}

export default CurrentOrder