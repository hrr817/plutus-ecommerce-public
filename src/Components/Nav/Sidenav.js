import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { toggleTheme } from '../../features/themeSlice'

// Components
import { SideMenu } from '../Reusable/SideMenu'

import { ReactComponent as BackIcon } from '../../assets/svg/back.svg'
import { ReactComponent as SunIcon } from '../../assets/svg/sun.svg'
import { ReactComponent as MoonIcon } from '../../assets/svg/moon.svg'

const Sidenav = (props) => {

    const { theme, setSidenav, showCart } = props
    const dispatch = useDispatch()

    return (
    <SideMenu theme={theme}>
      {/* Back Button */}
      <SideMenu.Back onClick={() => setSidenav(false)}> <BackIcon/> </SideMenu.Back>
      {showCart && <Link to="/cart"> Cart </Link>}
      <SideMenu.Item className="icon" onClick={() => dispatch(toggleTheme())}>
        Switch
        <span>
          <SunIcon style={{background: theme === 'light' && '#3f3e3e'}}/>
          <MoonIcon style={{background: theme === 'dark' && '#3f3e3e'}}/>
        </span>
      </SideMenu.Item>
      <Link to="/about"> Know more </Link>
    </SideMenu>
    )
}

export default React.memo(Sidenav)
