/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Moment from 'react-moment'



function ResultOrders({ element }) {

    const { state, date, items } = element
    let totalPriceOrder = 0
    
  
    return <>
    
        <section className="myOrders__order" >
               

                   <ul className="abc">{items.map(element => {
                       
                       const { article , quantity} = element
                       const {title, ref, price,id} = article
                       let totalArticle = price * quantity
                       totalPriceOrder += totalArticle
                       return<ul className="myOrders__order--items" key={id}>
                                <li>Ref: {ref}</li>
                                <li>{title}</li>
                                <li>{quantity} units</li>
                                <li>{price} € </li>
                                <li>Total: {totalArticle.toFixed(2)} €</li>
                            </ul>
                   })}</ul>

                   <ul className="myOrders__order--data">
                        <li>Date: <Moment format="YYYY-MM-DD HH:mm">{date}</Moment></li>
                        <li className="status"><p>State:</p> <p className={`status__${state}`}>{state.toUpperCase()}</p></li>
                        <li>Total Order: {totalPriceOrder.toFixed(2)} €</li>
                   </ul>
                 
              
        </section>
        
    </>
}

export default ResultOrders