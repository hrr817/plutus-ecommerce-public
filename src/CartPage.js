import React, { useState, useEffect, useCallback } from 'react'
import { selectTheme, setTheme } from './features/themeSlice'

// Components
import Nav from './Components/Nav/Nav'
import CartSection from './Components/CartSection/CartSection'
import Loading from './Components/Reusable/Loading'


import { useSelector, useDispatch } from 'react-redux'
import { ModelBox } from './Components/Reusable/ModelBox';


import { commerce } from './lib/commerce'
import { selectCart, updateCart, clearCart } from './features/cartSlice'

const CartPage = () => {
     
     const dispatch = useDispatch()
     const theme = useSelector(selectTheme)
     const cart = useSelector(selectCart)

     const [loading, setLoading] = useState(false)

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

     useEffect(() => {
          if(!cart) {
               (async () => {
                    try {
                         setLoading(true)
                         let res = await commerce.cart.retrieve()
                         dispatch(updateCart(res))
                         setLoading(false)
                    } catch(e) {
                         // console.log(e)
                    }
               })();
          }
     }, [cart, dispatch])


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
          <div className={`app ${'app-' + theme}`}>
               <Nav theme={theme}/>
               <ModelBox theme={theme} width="90%">
                    <ModelBox.Header> Cart </ModelBox.Header>
                    {loading? 
                    <ModelBox.Section center>
                         <Loading theme={theme}/>
                    </ModelBox.Section> :
                    <CartSection data={cart}
                         emptyCartHandler={emptyCartHandler} 
                         removeItemHandler={removeItemHandler}
                         handleItemQuantityUpdate={handleItemQuantityUpdate}/>
                    }
               </ModelBox>
          </div>


     )
}

export default React.memo(CartPage)


