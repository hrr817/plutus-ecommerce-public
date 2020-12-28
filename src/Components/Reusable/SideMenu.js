import React from 'react'
import { motion } from 'framer-motion'

import './SideMenu.scss'

const SideMenu = React.memo((props) => {
     return (
     <motion.div className={`sidemenu-bg`}
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{type: 'spring', mass: 1, stiffness: 55 }}>

          <motion.div className={`sidemenu ${props.theme}`}
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{type: 'spring', mass: 0.7, stiffness: 45 }}>

          <motion.div className={`item-container`}
          initial={{ x: '100%'}} 
          animate={{ x: 0}}
          exit={{ x: '100%'}}
          transition={{type: 'spring', mass: 0.7, stiffness: 45 }}>
               {props.children.map((child, idx) => {
                    if(React.isValidElement(child)){
                         return React.cloneElement(child, { key: idx, theme: props.theme })
                    }
                    return null
               })}
          </motion.div>

          </motion.div>
     </motion.div>)
     
})

const Back = React.memo(props => {

     return (
          <motion.div className="back" onClick={() => props.onClick && props.onClick()}
               initial={{ scale: 0 }} 
               animate={{ scale: 1 }}
               exit={{ scale: 0 }}
               whileTap={{ scale: 0.9 }}
               transition={{type: 'spring', bounce: 0.1, mass: 1, stiffness: 55 }}>
               {props.children}
          </motion.div>
     )
})

const Item = React.memo((props) => {

     return (
          <motion.div className="item" onClick={() => props.onClick && props.onClick()}
               initial={{ scale: 0 }} 
               animate={{ scale: 1 }}
               exit={{ scale: 0 }}
               whileTap={{ scale: 0.9 }}
               transition={{type: 'spring', bounce: 0.1, mass: 1, stiffness: 55 }}>
               {props.children}
          </motion.div>
     )
})




SideMenu.Back = Back
SideMenu.Item = Item
export { SideMenu }
