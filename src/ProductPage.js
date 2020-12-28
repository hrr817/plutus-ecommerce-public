import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectTheme, setTheme } from './features/themeSlice' 
import { useDispatch } from 'react-redux'

// Main Components
import Nav from './Components/Nav/Nav'
import ProductDetails from './Components/ProductDetails/ProductDetails'

import { commerce } from './lib/commerce'

const ProductPage = (props) => {

     const theme = useSelector(selectTheme)
     const dispatch = useDispatch()


     const [productData, setProductData] = useState()


     const fetchProduct = async id => {
          try {
               let res = await commerce.products.retrieve(id)
               setProductData(res)
          } catch (e) {
               e.statusCode === 404 && setProductData(404)
          }
     }

     useEffect(() => {
          // Get product id from url
          if(props.location.search) {
               let query = props.location.search.toString()
               // id is given
               if(query.substring(1, 4) === 'id='){
                    let id = query.substring(4)
                    fetchProduct(id)
               }
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])

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

     return (
          <div className={`app ${'app-' + theme}`}>
               <Nav theme={theme} showCart={true}/>
               {
                    productData === 404? 
                    <span> Couldn't find the product, pardon! </span> :
                    productData && <ProductDetails theme={theme} data={productData}/> 
               }
          </div>
     )
}

export default React.memo(ProductPage)
