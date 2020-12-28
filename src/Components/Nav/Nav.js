import React from 'react'
import { useSelector } from 'react-redux'
import {AnimatePresence} from 'framer-motion'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleTheme } from '../../features/themeSlice'
import CartModel from '../Reusable/CartModel'

import './Nav.scss'


// Resuable Components
import Sidenav from './Sidenav'
import { Navigation } from '../Reusable/Navigation'
import { Dropdown } from '../Reusable/Dropdown'
import { IconButton } from '../Reusable/IconButton'


import { ReactComponent as MenuIcon } from '../../assets/svg/menu.svg'
import { ReactComponent as SunIcon } from '../../assets/svg/sun.svg'
import { ReactComponent as MoonIcon } from '../../assets/svg/moon.svg'
import { ReactComponent as CartIcon } from '../../assets/svg/cart.svg'
import { ReactComponent as ArrowDownIcon } from '../../assets/svg/arrow-down.svg'


import { selectCart } from '../../features/cartSlice' 


const Count = () => {
     const cart = useSelector(selectCart) 
     const [ct, setCt] = React.useState(0)
     React.useEffect(() => {
          cart && setCt(cart.total_items)
     }, [cart]);
     return ct? <span className="num"> {ct} </span> : '' 
}

const Nav = (props) => {
     const { theme, showCart } = props
     const dispatch = useDispatch()

     const [showSidenav, changeSidenav] = React.useState(false)

     const setSidenav = React.useCallback(val => changeSidenav(val), [])

     return (
     <>
     <Navigation theme={theme}>
          <Navigation.Logo><Link to="/"> Plutus </Link></Navigation.Logo>
          <Navigation.Box>
               {showCart && <Dropdown theme={theme} className="nav-item">
                    <Dropdown.Toggle className="svg-icon"> <CartIcon/> <span>Cart</span> <Count /> </Dropdown.Toggle>
                    <Dropdown.CustomDropdownMenu>
                         <CartModel />
                    </Dropdown.CustomDropdownMenu>
               </Dropdown>}
               <Dropdown theme={theme} className="nav-item">
                    <Dropdown.Toggle className="svg-icon"> <ArrowDownIcon /> </Dropdown.Toggle>
                    <Dropdown.Menu>
                         <Dropdown.Item>Categories</Dropdown.Item>
                         <Dropdown.Item onClick={() => dispatch(toggleTheme())}>
                              Switch
                              <div>
                              <SunIcon style={{background: theme === 'light' && '#3f3e3e'}}/>
                              <MoonIcon style={{background: theme === 'dark' && '#3f3e3e'}}/>
                              </div>
                         </Dropdown.Item>
                         <Link to="/about"><Dropdown.Item>  Know more </Dropdown.Item></Link>
                    </Dropdown.Menu>
               </Dropdown>

               <IconButton icon={<MenuIcon/>} className="nav-item-mobile" onClick={() => setSidenav(true)}/>
          </Navigation.Box>
     </Navigation>

     <AnimatePresence>
          {showSidenav && 
          <Sidenav theme={theme} setSidenav={setSidenav} showCart={showCart}/>}
      </AnimatePresence>
     </>
     )
}

export default React.memo(Nav)
