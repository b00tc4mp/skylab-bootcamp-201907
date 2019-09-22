/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'
import ResultOrders from './Result-orders'
import ResultAllADminOrders from './Result-all-admin-orders'
import './index.sass'

function AdminPanel() {

  //const [error, setError] = useState()
  const [orders, setOrders] = useState()
  const [allOrders, setAllOrders] = useState()

  async function handlePendingOrders() {

    (async () => {

      try {
        const {orders} = await logic.retrievePendingOrders()
        setAllOrders()
        setOrders(orders)
      } catch (error) {
        //setError(error)
      }

    })()
  }

  async function handleAllOrders() {

    (async () => {
      try {
        const orders = await logic.retrieveAllOrders()
          setOrders()
          setAllOrders(orders)
      } catch (error) {
        //setError(error)
      }
    })()
  }
 
  return <>

    <section className="adminMain">
      <section className="adminPanel">
        <h1>ADMIN PANEL</h1>
        <div className="adminPanel__buttons">
          <button onClick={handlePendingOrders}>Retrieve all PENDING orders</button>
          <button onClick={handleAllOrders}>Retrieve all ORDERS</button>
        </div>
      </section>
      <section>
        <ul>          
          {orders && <ResultOrders orders={orders}   retrievePendingOrders={handlePendingOrders}/>}
          {allOrders  && <ResultAllADminOrders orders={allOrders} />}
        </ul>
      </section>
    </section>

  </>
}

export default withRouter(AdminPanel)