import React, {useState, useEffect, useCallback} from 'react'
import { selectTheme, setTheme } from './features/themeSlice'

// Components
import Nav from './Components/Nav/Nav'
import AddressBox from './Components/Checkout/AddressBox'
import PaymentBox from './Components/Checkout/PaymentBox'
import ConfirmBox from './Components/Checkout/ConfirmBox'

// Resuable
import { ModelBox } from './Components/Reusable/ModelBox'
// hook
import { useBook } from './Hooks/useBook'
// SVG
import {ReactComponent as EmptyBoxSVG} from './assets/svg/box.svg'

import { commerce } from './lib/commerce'

import { useSelector, useDispatch } from 'react-redux'
import { selectCart, updateCart } from './features/cartSlice';

const CheckoutPage = () => {

     const dispatch = useDispatch()
     const theme = useSelector(selectTheme)
     const cartData = useSelector(selectCart)
     
     const [token, setToken] = useState(null)
     const [loading, setLoading] = useState(false)

     const [shippingData, setShippingData] = useState()
     const [order, setOrder] = useState() 

     const [Book, , next, prev] = useBook()

     // For theme
     useEffect(() => {    
          let userTheme = localStorage.getItem('plutus-theme')
          if(userTheme === 'dark') {
               dispatch(setTheme(userTheme))
          }
     }, [dispatch]);

     useEffect(() => {
          localStorage.setItem('plutus-theme', theme)
     }, [theme])
     // End for Theme


     // if there is no cartData then fetch
     useEffect(() => {
          if(cartData === null){
               (async () => {
                    setLoading(true)
                    let res = await commerce.cart.retrieve()
                    dispatch(updateCart(res))
                    setLoading(false)
               })();
          }
     }, [cartData, dispatch]);

     // request for checkout token and get shipping informations
     useEffect(() => {
          if(cartData && cartData.total_items) {
               (async () => {
                    try {
                         setLoading(true)
                         let token = await commerce.checkout.generateToken(cartData.id, {type: 'cart'})
                         setToken(token)
                         setLoading(false)
                    } catch(e) {
                         //  console.log(e)
                    }
               })();
          }
     }, [cartData]);
     

     const proceedToPayments = useCallback((data) => {
          setShippingData(data)
          next()
     }, [next])
     
     const refreshCart = async() => {
          const temp = await commerce.cart.refresh();
          dispatch(updateCart(temp)) 
     }

     const handleCaptureOrder = async (tokenId, newOrder) => {
          try {
               const incomingOrder = await commerce.checkout.capture(tokenId, newOrder);
               setOrder(incomingOrder);
               refreshCart();
          } catch(err) {
               // console.log(err)
          }
     }

     return (
          <div className={`app ${'app-' + theme}`}>
               <Nav theme={theme}/>
               {cartData && cartData.total_items?  
               <ModelBox theme={theme} maxWidth="700px">
                    <ModelBox.Header> Checkout </ModelBox.Header>
                    <Book>
                         <AddressBox theme={theme} shippingData={shippingData} token={token} loading={loading} proceedToPayments={proceedToPayments}/>
                         <PaymentBox token={token} shippingData={shippingData} handleCaptureOrder={handleCaptureOrder} prev={prev} next={next}/>
                         <ConfirmBox/>
                    </Book>
               </ModelBox> :
               <ModelBox theme={theme} maxWidth="700px">
                    <ModelBox.Header> Cart is empty </ModelBox.Header>
                    <ModelBox.Section center> 
                         <div>
                              <EmptyBoxSVG/>
                              Try adding items to cart!
                         </div>
                    </ModelBox.Section>
               </ModelBox> }
          </div>
     )
}

export default React.memo(CheckoutPage)
