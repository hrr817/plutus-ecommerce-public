import React, {useEffect, useCallback} from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { useSelector, useDispatch } from 'react-redux'
import { selectCart, updateCart, clearCart } from '../../features/cartSlice'

import Loading from './Loading'
import {ReactComponent as EmptyBoxIcon} from '../../assets/svg/box.svg' 
import './CartModel.scss'

import { commerce } from '../../lib/commerce';

const CartItem = React.memo(({ product, removeItem, updateQuantity }) => { 

     return (
          <li className="product-box">
               <img src={product.media.source} alt={product.name}/>
               <div>
                    <span>{ product.name }</span>
                    <span> Quantity 
                         <motion.button className="plus-minus-button" 
                         whileTap={{ scale: 0.9 }}
                         onClick={() => updateQuantity(product.id, product.quantity - 1)}> - </motion.button> 
                         {product.quantity} 
                         <motion.button className="plus-minus-button"
                         whileTap={{ scale: 0.9 }}
                         onClick={() => updateQuantity(product.id, product.quantity + 1)}> + </motion.button>
                    </span>
                    <span>{ product.price && product.price.formatted_with_symbol } </span>
                    <button className="btn" onClick={() => removeItem(product.id)}> Remove </button>
               </div>
          </li>
     )
})

const EmptyCart = React.memo((props) => {
     return (
          <div>
               <EmptyBoxIcon />
               <span>No Products</span>
          </div>
     )
})

const CartModel = (props) => { 
     const dispatch = useDispatch()
     const { theme } = props
     const [loading, setLoading] = React.useState(false)


     const cartData = useSelector(selectCart)

     const fetchCartData = useCallback( 
          async() => {
          if(!cartData) {
               try {
                    setLoading(true)
                    let res = await commerce.cart.retrieve()
                    dispatch(updateCart(res))
                    setLoading(false)
               } catch(e) {
                    // console.log(e)
               }
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])

     useEffect(() => {
          fetchCartData()
     }, [fetchCartData])

     const handleItemQuantityUpdate = useCallback((product_id, quantity) => {
          commerce.cart.update(product_id, { quantity: quantity })
          .then(res => dispatch(updateCart(res.cart)) )
     }, [dispatch])

     const removeItemHandler = useCallback(id => {
          commerce.cart.remove(id)
          .then(res => { dispatch(updateCart(res.cart)) })
     }, [dispatch])

     const emptyCartHandler = useCallback(() => {
          setLoading(true)
          commerce.cart.empty()
          .then(() => {
               dispatch(clearCart())
               setLoading(false)
          })
     }, [dispatch])

     return (
          <motion.div className={`cart-model ${theme}`}
          initial={{ scale: 0, y: '-55%', x: "45%"}} 
          animate={{ scale: 1, y: 0, x: 0}}
          exit={{ scale: 0, y: '-55%', x: "45%"}}
          transition={{type: 'spring', mass: 0.5, stiffness: 50 }}>
               <h2> Cart </h2>
               {loading? <Loading theme={theme}/> : 
               cartData && cartData.line_items.length?
               <>
                    <ul>
                         { cartData.line_items.map(product => <CartItem key={product.id + Math.random()} product={product}
                         removeItem={ removeItemHandler }
                         updateQuantity={ handleItemQuantityUpdate } />
                         )}
                    </ul>
                    <div>
                         <button className="btn" onClick={ emptyCartHandler }>Empty Cart</button>
                         <Link className="btn" to="/cart"> Go to Cart </Link>
                    </div>
               </> : 
               <EmptyCart />
               
               }
          </motion.div>
     )
}

export default React.memo(CartModel)
