import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import './CartSection.scss'

// Resable Component
import { ModelBox } from '../Reusable/ModelBox';

// SVG
import {ReactComponent as EmptyBoxIcon} from '../../assets/svg/box.svg' 

const CartSection = ({data, removeItemHandler, emptyCartHandler, handleItemQuantityUpdate}) => {     

     return (
          data && data.line_items.length?  
          <ModelBox.Section className="cart">
               <div className="space">
                    <span> Total Items: {data.total_items} </span>
                    <span> Total Products: {data.total_unique_items} </span>
                    <span> Total: {data.subtotal.formatted_with_symbol} </span>
                    <span style={{fontSize: '0.7em', color: '#6b6a6aaf'}}> (Excluding shipping charges) </span>
                    <span style={{justifyContent:'flex-end'}}> <Link to="/checkout" className="btn">Check Out</Link> </span>
               </div>

               {
                    data.line_items.map((item, idx) => 
                    <Product key={idx} data={item} 
                         handleItemQuantityUpdate={handleItemQuantityUpdate}
                         removeItemHandler={removeItemHandler} />
                    )
               }

               <div className="footer"> 
                    <button className="btn" onClick={() => emptyCartHandler()}>Empty Cart</button> 
               </div>
          </ModelBox.Section>  : 
          <ModelBox.Section center>
               <EmptyBoxIcon className="size-5"/>
               <span style={{marginTop: '1em'}}>Cart is empty :(</span>
          </ModelBox.Section>
     )
}

export default React.memo(CartSection)


const Product = React.memo((props) => {

     const { data, handleItemQuantityUpdate, removeItemHandler } = props

     return (
          data.name? 
          <section className="cart-product">
               <div> <img src={data.media.source} alt={data.name}/> </div>
               <div className="right">
                    <span> {data.name} </span>
                    <span> {data.price.formatted_with_symbol} </span>
                    <span> Quantity 
                         <motion.button
                         whileTap={{ scale: 0.9 }}
                         onClick={() => handleItemQuantityUpdate(data.id, data.quantity - 1)}> - </motion.button> 
                         {data.quantity} 
                         <motion.button
                         whileTap={{ scale: 0.9 }}
                         onClick={() => handleItemQuantityUpdate(data.id, data.quantity + 1)}> + </motion.button>
                    </span>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                         <button className="btn" onClick={() => removeItemHandler(data.id)}>Remove</button>
                    </div>
               </div>
          </section>
          : <></>
     )
})