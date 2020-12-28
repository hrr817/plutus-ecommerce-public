import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import './FeatureSection.scss'

// Component
import { ModelBox } from '../Reusable/ModelBox'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { updateCart, selectCart } from '../../features/cartSlice'
// CommerceJS
import { commerce } from '../../lib/commerce'

const param = { category_slug: 'featured' }

// Product component
const Product = React.memo(props => {
     const [overlay, setOverlay] = useState(false)
     const { product, theme } = props 

     const dispatch = useDispatch()

     if(!product) return <> </>

     const addToCartHandler = product => {
          // Add to cart using fetch
          // const url = new URL(`https://api.chec.io/v1/carts/${cartData.id}`);

          // let headers = {
          //      "X-Authorization": process.env.REACT_APP_CHEC_PUBLIC_KEY,
          //      "Content-Type": "application/json",
          //      "Accept": "application/json",
          // };
          
          // const defaultVariant = {}
          // product.variants.map(v => {
          //      defaultVariant[v.id] = v.options[0].id
          // })

          // the below data sent to api is said as unprocessable: "id"
          // let body = {
          //      "id": product.id.toString(),
          //      "variant": defaultVariant
          // };

          // fetch(url, {    
          //      method: "POST",
          //      headers: headers,
          //      body: body })
          // .then(response => response.json())
          // .then(json => console.log(json));

          commerce.cart.add(product.id, 1)
          .then(res => { 
               dispatch(updateCart(res.cart))
          })
          .catch(err => {
               // console.log(err)
          })
     }

     return (
          <motion.section className={`product ${theme && theme}`} 
          onMouseEnter={() => setOverlay(true)}
          onMouseLeave={() => setOverlay(false)}          
          initial={{ opacity: 0, y: 200 }} 
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 200 }}
          transition={{type: 'spring', mass: 0.6, stiffness: 55 }} >
               {product.has.images && <img src={product.media.source} alt={product.name} className="img"/>}
               <div>
                    <span className="name">{ product.name }</span>
                    <span className="price">{ product.price.formatted_with_symbol }</span>
               </div>
               <AnimatePresence>
               {overlay && <motion.div className="overlay"
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{type: 'spring', mass: 3, stiffness: 90 }}>
                    <motion.span 
                    whileTap={{ scale: 0.9 }}
                    className={theme && theme}
                    onClick={() => addToCartHandler(product)}
                    >Add to Cart</motion.span>
                    <span className={theme && theme}><Link to={'/product?id=' + product.id}>Check Product</Link></span>
               </motion.div>}
               </AnimatePresence>
               
          </motion.section> 
     )
})

const FeatureSection = (props) => {

     const cartData = useSelector(selectCart)
     const dispatch = useDispatch()
     const [featuredProducts, setFeaturedProducts] = useState([])

     useEffect(() => {
          if(!cartData){
               const url = new URL("https://api.chec.io/v1/carts");

               let headers = {
               "X-Authorization": process.env.REACT_APP_CHEC_PUBLIC_KEY,
               "Accept": "application/json",
               "Content-Type": "application/json",
               };

               fetch(url, { method: "GET", headers: headers, })
               .then(response => response.json())
               .then(json => dispatch(updateCart(json)));
          }
     }, [cartData, dispatch])

     useEffect(() => {
          (async () => {
               try {
                    let res = await commerce.products.list(param)
                    setFeaturedProducts(res.data)
               } catch(e) {
                    // console.log(e)
               }
          })();
     }, [])

     return (
          <ModelBox theme={props.theme} width="90%" maxWidth="1400px">
               <ModelBox.Header> Featured </ModelBox.Header>
               <ModelBox.Section> 
               {
                    // Only render products if fetching is complete else show loading 
                    featuredProducts.length ?  
                    <div className="products-container">
                         {featuredProducts.map(details => 
                         <Product key={details.id}
                         theme={props.theme}
                         cartData={cartData} 
                         product={details}/>)}
                    </div>
                     : 
                    <div className={`loading ${props.theme && props.theme}`}> 
                    Loading
                    <span className="dot1">.</span>
                    <span className="dot2">.</span>
                    <span className="dot3">.</span>
                    </div>
               }
               </ModelBox.Section>
          </ModelBox>
     )
}

export default React.memo(FeatureSection)
