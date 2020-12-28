import React from 'react'
import { ModelBox } from '../Reusable/ModelBox'

import { Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

// Custom styling for card element.
const CARD_ELEMENT_OPTIONS = {
     style: {
          base: {
               color: '#32325d',
               fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
               fontSmoothing: 'antialiased',
               fontSize: '16px',
               '::placeholder': {
                    color: '#aab7c4',
               }
          },
          invalid: {
               color: '#fa755a',
               iconColor: '#fa755a'
          }
     }
};

const PaymentPage = props => {

     const { token, prev, next, shippingData, handleCaptureOrder } = props

     const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

     // Handle form submission.
     const handleSubmit = async (e, stripe, elements) => {
          e.preventDefault();


          if(!stripe || !elements) return

          const cardElement = elements.getElement(CardElement);

          const { error, paymentMethod } = await stripe.createPaymentMethod({
               type: 'card', card: cardElement
          })

          if(error) {
               // console.log(error)
          } else {
               const orderData = {
                    "line_items": {...token.live.line_items},
                    "customer": {    "firstname": shippingData.firstName, 
                                   "lastname": shippingData.lastName,
                                   "email": shippingData.email },
                    "shipping": {
                                   "name": shippingData.firstName + ' ' + shippingData.lastName, 
                                   "street": shippingData.address1,
                                   "town_city": shippingData.city,
                                   "county_state": shippingData.shippingSubdivision,
                                   "postal_zip_code": shippingData.zip,
                                   "country": shippingData.shippingCountry },
                    "fulfillment": { "shipping_method": shippingData.shippingOption },
                    "payment": {
                         "gateway": 'stripe',
                         "stripe": {
                              payment_method_id: paymentMethod.id
                         }
                    }
               }

               handleCaptureOrder(token.id, orderData)
               next()
          }
          
     };

     return (
          <>
               <ModelBox.Section className="tab-section"> 
                    <div>
                         <span> 1 </span> 
                         Shipping address 
                    </div>
                    <div className="active-tab">
                         <span  className="active-num"> 2 </span> 
                         Payment details  
                    </div>
               </ModelBox.Section>
               
               <div className="header" style={{textAlign: 'left'}}> Order Summary </div>
               
               {/* Ignore className 'form' */}
               <div className="form" style={{paddingBottom: '1em'}}>
                    { token && token.live.line_items.map(item => 
                         <div key="item.name" className="item-in-order-summary">
                              <div>
                                   <span> {item.name} </span>
                                   <span> {item.price.formatted_with_symbol} </span>
                              </div>
                              <div style={{color: '#615a5a'}}> Quantity: {item.quantity} </div>
                         </div>
                    ) }
               </div>
               
               <div className="header" style={{ borderTop: '1px solid #b4b0b0cc'}}> Price Details </div>
               <div style={{ display: 'flex', flexDirection: 'column', padding: '1em 0 0 0'}}>
                    <span style={{margin: '0 2em', padding: '0.4em 0'}}> Tax: {token.live.tax.amount.formatted_with_symbol} </span>
                    <span style={{margin: '0 2em', padding: '0.4em 0'}}> Shipping Charges: {token.live.shipping.price.formatted_with_symbol} </span>
                    <span style={{margin: '0 2em', padding: '0.4em 0'}}> Sub Total: {token.live.subtotal.formatted_with_symbol} </span>
                    <span style={{margin: '0 2em', padding: '0.4em 0'}}> Total: {token.live.total_with_tax.formatted_with_symbol} </span>
               </div>

               {/* Form for Payment */}
               <Elements stripe={stripePromise}>
                    <ElementsConsumer>
                    {({stripe, elements}) => 
                         <form onSubmit={e => handleSubmit(e, stripe, elements)}>
                              <div className="header" style={{ borderTop: '1px solid #b4b0b0cc', marginBottom: '1em'}}> Payment Method</div>
                              <div style={{margin: '0 2em', padding: '0em 0'}}>
                                   <CardElement options={CARD_ELEMENT_OPTIONS}/>
                              </div> 

                              <div style={{display: 'flex', marginTop: '1em'}}>
                              <button className="button-full back" onClick={prev}> Change Address </button>
                              <button className="button-full next"> Pay {token.live.subtotal.formatted_with_symbol} </button> 
                              </div>
                         </form>
                    }
                    </ElementsConsumer>
               </Elements>
               
          </>
     )
}

export default React.memo(PaymentPage)
