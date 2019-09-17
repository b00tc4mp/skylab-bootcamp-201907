import React, { useContext, useEffect, useState } from 'react'
import Context from '../Context'
import logic from '../../logic'
import Countdown from 'react-countdown-now';
import './index.sass'
import moment from 'moment'


function AuctionDetail() {
  // Random component
  const Completionist = () => <span>Auction finished !!!</span>;
  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return <span>Remaining minutes: {minutes}:{seconds}</span>
    }
  }

  const [counter, setCounter] = useState(1)
  const [success, setSuccess] = useState(false)
  const [priceAuction, setPriceAuction] = useState(undefined)
  const [owner, setOwner] = useState(undefined)
  const [time, setTime] = useState(undefined)
  const [finalTime, setFinalTime] = useState(undefined)

  let quantity = counter
  let price
  let auctionId
  let initialTime
  let actualTime
  let diffTime

  const { setView, view, product, setProduct, productQuery, user } = useContext(Context)
  const productId = productQuery

  /*   xactualDate=Date()
    console.log(xactualDate.toString().slice(19,21), 'actualdate')
    setActualDate(xactualDate.toString().slice(19,21)) */

  useEffect(() => {
    (async () => {
      try {
        const product = await logic.retrieveProduct(productQuery)
        
        setProduct(product)
        setCounter(product.price)

        const auction = await logic.retrieveAuctionProduct(productId)
        console.log(auction)

        if (auction.auction === false) {
          const result = await logic.setAuction(productId)

          setSuccess(true)

          console.log("added to auction")
        } else {
          auctionId = auction.auction._id
          debugger
          const res = await logic.setDate(auctionId)
          console.log(res)
          const response = await logic.retrieveAuction(auctionId)
          console.log('auction retrieved')

          setPriceAuction(response.auction.price)
          setCounter(response.auction.price)
          setOwner(response.auction.owner.name)

          initialTime = moment(response.auction.date).minutes()
          actualTime = moment().minutes()

          if (actualTime < initialTime) {
            diffTime = initialTime - actualTime
          }

          if (actualTime > initialTime) {
            diffTime = 60 - actualTime + initialTime
          }

          const finalTime = parseInt(diffTime * 60000)

          console.log(finalTime)

          debugger

          setFinalTime(finalTime)
        }

      } catch (error) {
        console.log(error.message)
      }
    })()
  }, [])

  function handleGoBack(event) {
    event.preventDefault()
    setView("landing")
  }

  function handleSubmitAuction(event) {
    event.preventDefault()
    console.log(productId)
    handleAuction(productId)
  }

  async function handleAuction(productId) {
    if (counter > priceAuction) {
      try {
        const isDefined = await logic.retrieveAuctionProduct(productId)
        console.log(isDefined)
        if (isDefined.auction === false) {
          const result = await logic.setAuction(productId)
          setSuccess(true)
          console.log("added to auction")
        }
        else {
          auctionId = isDefined.auction._id

          await logic.setDate(auctionId)
          /* const response=await logic.retrieveAuction(auctionId)      
          console.log('auction retrieved')
          setPriceAuction(response.auction.price) */
          price = parseInt(counter)
          await logic.updateAuction(auctionId, price)
          const response = await logic.retrieveAuction(auctionId)
          console.log('auction retrieved')
          setPriceAuction(response.auction.price)
          setCounter(response.auction.price)
          setOwner(response.auction.owner.name)
          initialTime = moment(response.auction.date).minutes()
          actualTime = moment().minutes()

          if (actualTime < initialTime) {
            diffTime = initialTime - actualTime
          }
          if (actualTime > initialTime) {
            diffTime = 60 - actualTime + initialTime
          }

          const finalTime = parseInt(diffTime * 60000)

          console.log(finalTime)

          debugger

          setFinalTime(finalTime)

        }


      } catch (error) {
        console.log(error.message)
      }

    }



  }


  return <>

    {product && user && <div>
      <ul className='detail'>
        <li className="detail-title">{product.title}</li>
        <li className="detail-picture"><img src={product.image} /></li>
        <li className="detail-price">{'Initial price: ' + product.price + " €"}</li>
        <li className="detail-description">{product.description}</li>
      </ul>
      <div className="detail-add-cart-container">

        {priceAuction === undefined && <div className="detail-counter">
          <button className="detail-operator" onClick={event => {
            event.preventDefault()
            setCounter(counter - 1)

            if (counter == product.price) setCounter(product.price)


          }}>-</button>
          <p className="detail-result">{counter + " €"}</p>
          <button className="detail-operator" onClick={event => {
            event.preventDefault()
            setCounter(counter + 1)

          }}>+</button>
        </div>}


        {priceAuction && <div className="detail-counter">
          <button className="detail-operator" onClick={event => {
            event.preventDefault()
            setCounter(counter - 1)

            if (counter == priceAuction) setCounter(priceAuction)

          }}>-</button>
          <p className="detail-result">{counter + " €"}</p>
          <button className="detail-operator" onClick={event => {
            event.preventDefault()
            setCounter(counter + 1)

          }}>+</button>

        </div>}

        <button className="formPanel-reject2"><a onClick={handleSubmitAuction}>Push Auction !</a></button>
        <br></br>
        {console.log(finalTime)}
        {finalTime && <Countdown date={Date.now() + parseInt(finalTime)} renderer={renderer} />}
        {priceAuction && <p className="detail-owner">{'Last push: ' + owner}</p>}

      </div>
      <a onClick={handleGoBack}><i className="far fa-2x fa-arrow-alt-circle-left backFromDetail"></i></a>
    </div>
    }

  </>
}

export default AuctionDetail