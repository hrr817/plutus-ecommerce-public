import React, {useState, useCallback} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import './Dropdown.scss'


const Dropdown = React.memo((props) => {
     const [open, setOpen] = useState(false)

     const setOpenCallback = useCallback((val) => {
          setOpen(val)
     }, [])

     return (
          <div className={`dropdown ${props.className}`}>
               {props.children.map((child, idx) => {
                    if(React.isValidElement(child)){
                         return React.cloneElement(child, {key: idx, theme: props.theme, open: open, setOpen: setOpenCallback})
                    }
                    return null
               })}
          </div>
     )
})

const DropdownToggle = React.memo((props) => {
     return props.type !== 'custom' ? (
          <button className={props.className? `${props.className} ${props.theme} ${props.open? 'focus' : ''}` : `dropdown-toggle ${props.theme}`} onClick={() => props.setOpen(!props.open)}
          style={{background: props.open && '#3f3e3e', color: props.open && '#fdfcfa'}}>
               {props.children}
          </button>
     ) : <> {props.children} </>
})

const DropdownMenu = React.memo((props) => {
     return (
          <AnimatePresence>
               {props.open && 
               <motion.ul className={`dropdown-menu ${props.theme}`}
                    initial={{ scale: 0, y: '-60%', x: "35%"}} 
                    animate={{ scale: 1, y: 0, x: 0 }}
                    exit={{ scale: 0, y: '-60%', x: "35%"}}
                    transition={{type: 'spring', bounce: 0, mass: 0.5, stiffness: 70 }}>
                    {props.children.map((child, idx) => {
                         if(React.isValidElement(child)){
                              return React.cloneElement(child, {key: idx, theme: props.theme})
                         }
                         return null
                    })}
               </motion.ul>}
          </AnimatePresence>
     )
})

const CustomDropdownMenu = React.memo((props) => {
     return (
          <AnimatePresence>
               {props.open && React.cloneElement(props.children, {theme: props.theme})}
          </AnimatePresence>
     )
})

const DropdownItem = React.memo((props) => {
     return (
          <motion.li onClick={() => props.onClick && props.onClick(props.theme)} className={props.theme}
               initial={{ scale: 0, opacity: 0}} 
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0, opacity: 0 }}
               whileTap={{scale: 0.9}}
               transition={{type: 'spring', bounce: 0, mass: 0.5, stiffness: 70 }}> 
               {props.children}
           </motion.li>
     )
})

Dropdown.Toggle = DropdownToggle
Dropdown.Menu = DropdownMenu
Dropdown.CustomDropdownMenu = CustomDropdownMenu
Dropdown.Item = DropdownItem

export {Dropdown}
