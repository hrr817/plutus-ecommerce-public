import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { selectTheme, setTheme } from './features/themeSlice' 
import { useDispatch } from 'react-redux'

// Main Components
import Nav from './Components/Nav/Nav'
import FeatureSection from './Components/FeatuaredSection/FeatureSection'

const HomePage = () => {

  const theme = useSelector(selectTheme)
  const dispatch = useDispatch()

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
      <FeatureSection theme={theme}/>
    </div>
  )
}

export default HomePage
