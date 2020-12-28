import React, { useState, useEffect, useCallback, memo } from 'react'
import { Link } from 'react-router-dom'
import './ProductDetails.scss'

import { ModelBox } from '../Reusable/ModelBox'
import { useBook } from '../../Hooks/useBook'


import { useSelector, useDispatch } from 'react-redux'
import { selectCart, updateCart } from '../../features/cartSlice'

import { commerce } from '../../lib/commerce';

// SVG
import { ReactComponent as ArrowLeft} from '../../assets/svg/left-arrow.svg'
import { ReactComponent as ArrowRight} from '../../assets/svg/right-arrow.svg'

const ProductDetails = ({theme, data}) => {

     const [added, setAdded] = useState(false)

     const dispatch = useDispatch()
     const cartData = useSelector(selectCart)

     const fetchCartData = useCallback(async() => {
          if(!cartData) {
               try {
                    let res = await commerce.cart.retrieve()
                    dispatch(updateCart(res))
               } catch(e) {
                    // console.log(e)
               }
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])


     useEffect(() => {
          fetchCartData()
     }, [fetchCartData])


     const checkIfAdded = useCallback(() => {
          if(cartData && cartData.line_items.length){
               cartData.line_items.map(item => {
                    setAdded(item.product_id === data.id? true : false)
                    return undefined
               })
          } else {
               setAdded(false)
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [cartData])

     useEffect(() => {
          checkIfAdded()
     }, [cartData, checkIfAdded])

     const addToCartHandler = (id) => {
          commerce.cart.add(id, 1)
          .then(res => { 
               dispatch(updateCart(res.cart))
               setAdded(true)
          })
          .catch(err => {
          })
     }

     return (
          <ModelBox className={`product-details-container ${theme}`} width="100%">
               {/* Section 1 for Carousal */}
               <ModelBox.Section className="section-one">
                    <Carousal data={data}/>
               </ModelBox.Section>
               {/* Section 2 for Product Information */}
               <ModelBox.Section className="section-two">
                    <div> {data.name} </div>  
                    <div>Price: {data.price.formatted_with_symbol} </div>  
                    <div className="right">
                         {added? <Link to="/cart" className="btn-custom">Go to Cart</Link> : 
                         <button className="btn-custom" onClick={() => addToCartHandler(data.id)}>Add to Cart</button>
                    }

                    </div>
                    {/* variants */}
                    {
                         data.variants.map(variant => 
                         <div key={variant.name} className="variant">
                              <span className="title"> { variant.name } </span>
                              <div className="childs">
                                   {variant.options.map(item => <span key={item.name}> { item.name } </span>)}
                              </div>
                         </div>
                         )
                    }
                    <div dangerouslySetInnerHTML={{__html: data.description}}></div>
               </ModelBox.Section>
          </ModelBox>
     )
}


const Carousal = memo(({data}) => {  
     const [Book, , nextPage, prevPage] = useBook()

     return (<>
          <Book infinite>
               {data && data.assets.map(img => <img key={img.id} src={img.url} alt={data.name}/>)}
          </Book>
          {data.assets.length !== 1 && 
          <>
               <button className="btn prev" onClick={() => prevPage()}>
                    <ArrowLeft />
               </button>
               <button className="btn next" onClick={() => nextPage()}>
                    <ArrowRight />
               </button>
          </>}
     </>)
})

export default memo(ProductDetails)


