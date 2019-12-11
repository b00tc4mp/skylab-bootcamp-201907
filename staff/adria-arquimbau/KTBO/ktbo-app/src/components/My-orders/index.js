/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'

import ResultOrders from '../../components/My-orders/Result-orders'

function MyOrders() {

  //const [error, setError] = useState(null)
  const [orders, setOrders] = useState(null)

  async function handleOrders() {
    try {
      const { orders } = await logic.retrieveAllUserOrders()  
      setOrders(orders)  
    } catch (error) {
      //setError(error)
      //TODO MODAL
    }
  }

  useEffect(() => {
    handleOrders()
  },[])

  return <>
    <main className="myOrdersMain">
      <section className="myOrders">
        <h1 className="myOrders__title">My Orders</h1>
        {orders && orders.map(element => {
          return <ResultOrders key={element.id} element={element} />
        })}
      </section>
    </main>
  </>
}

export default withRouter(MyOrders)